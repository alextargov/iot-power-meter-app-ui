import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CronJob } from 'cron';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

import { IVoltage } from '../../shared/interfaces/voltage.interface';
import { ICurrent } from '../../shared/interfaces/current.interface';
import { IConsumption } from '../../shared/interfaces/consumption.interface';
import { MeasurementService } from '../../shared/services/measurement/measurement.service';
import { TimeFrames } from '../../shared/services/timeFrame/time-frames.enum';
import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';
import { DeviceService } from '../../shared/services/device/device.service';
import { IDevice } from '../../shared/services/device/device.interface';
import { IUser } from '../../shared/services/auth/user.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { SubscribedComponent } from '../../shared/components/subscribed/subscribed.component';
import { IMeasurement } from '../../shared/services/measurement/measurement.interface';
import { BroadcasterService } from '../../shared/services/broadcaster/broadcaster.service';
import { broadcasterEvents } from '../../shared/constants/broadcaster-event.constants';
import { LoadingOverlayService } from '../../shared/services/loading-overlay/loading-overlay.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends SubscribedComponent implements OnInit, OnDestroy {
    public currentData: ICurrent[] = [];
    public voltageData: IVoltage[] = [];
    public consumptionData: IConsumption[] = [];
    public timeFrame: ITimeFrame;
    public devices: IDevice[];
    public selectedDevice = 'All';
    public readonly allDevicesSelected = 'All';

    private job: CronJob;
    private user: IUser;
    private renderedCharts = new Set();

    constructor(
        private readonly measurementService: MeasurementService,
        private zone: NgZone,
        private readonly deviceService: DeviceService,
        private readonly authService: AuthService,
        private readonly broadcasterService: BroadcasterService,
        private readonly loadingOverlayService: LoadingOverlayService,
    ) {
        super();

        this.job = new CronJob('*/5 * * * * *', () => {
            const lastData = this.voltageData.length ? this.voltageData[this.voltageData.length - 1].date : new Date();
            const timeFrameObject = {
                frame: TimeFrames.todayLive,
                startDate: moment(lastData).subtract(moment().utcOffset(), 'minutes').add(1, 'second').toDate(),
                endDate: moment().endOf('day').toDate(),
                wholeDay: false
            };

            this.selectedDevice === this.allDevicesSelected ?
                this.getData(timeFrameObject) :
                this.getDeviceData(timeFrameObject, this.selectedDevice);
        });
    }

    public ngOnInit(): void {
        this.user = this.authService.getUser();
        this.loadingOverlayService.show();
        if (this.user) {
            this.deviceService.getDeviceByUserId(this.user._id)
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe((devices) => {
                    this.devices = devices;
                });
        }

        this.broadcasterService.on(broadcasterEvents.chartRendered)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((chartId) => {
                this.renderedCharts.add(chartId);

                if (this.renderedCharts.size >= 3) {
                    this.loadingOverlayService.hide();
                }
            });

        if (this.timeFrame) {
            this.getData(this.timeFrame);
        }
    }

    public onTimeFrameChange(event: any): void {
        this.timeFrame = event;

        if (this.timeFrame.frame === TimeFrames.todayLive) {
            this.job.start();
        } else {
            this.loadingOverlayService.show();
            this.job.stop();
        }

        this.getData(this.timeFrame);
    }

    public ngOnDestroy(): void {
        this.job.stop();
    }

    private async getData(timeFrame: ITimeFrame, shouldConsiderEmptyData = false): Promise<void> {
        this.renderedCharts.clear();

        this.measurementService.getMeasurements(timeFrame, this.job.running)
            .subscribe((measurements) => {
                this.aggregateData(measurements, shouldConsiderEmptyData);
            });
    }

    private async getDeviceData(timeFrame: ITimeFrame, selectedDevice: string, shouldConsiderEmptyData = false): Promise<void> {
        this.renderedCharts.clear();

        this.measurementService.getDeviceMeasurements(timeFrame, selectedDevice, this.job.running)
            .subscribe((measurements) => {
                this.aggregateData(measurements, shouldConsiderEmptyData);
            });
    }

    public async onDeviceChange(event: MatSelectChange): Promise<void> {
        event.value === this.allDevicesSelected ?
            await this.getData(this.timeFrame, true) :
            await this.getDeviceData(this.timeFrame, event.value, true);
    }

    private setData(currentData: ICurrent[], voltageData: IVoltage[], consumptionData: IConsumption[]): void {
        this.consumptionData = consumptionData;
        this.voltageData = voltageData;
        this.currentData = currentData;
    }

    private aggregateData(measurements: IMeasurement[], shouldConsiderEmptyData: boolean): void {
        if (this.timeFrame.frame === TimeFrames.todayLive && !measurements.length && !shouldConsiderEmptyData) {
            return;
        }

        const {
            consumptionData,
            currentData,
            voltageData
        } = measurements.reduce(
            (collection, currentElement) => ({
                ...collection,
                currentData: [
                    ...collection.currentData,
                    {
                        date: new Date(currentElement.createdAt),
                        value: Number(currentElement.current.toFixed(2))
                    }
                ],
                voltageData: [
                    ...collection.voltageData,
                    {
                        date: new Date(currentElement.createdAt),
                        value: Number(currentElement.voltage.toFixed(2))
                    }
                ],
                consumptionData: [
                    ...collection.consumptionData,
                    {
                        date: new Date(currentElement.createdAt),
                        value: Number(currentElement.power.toFixed(2))
                    }
                ]
            }),
            {
                currentData: [] as ICurrent[],
                voltageData: [] as IVoltage[],
                consumptionData: [] as IConsumption[]
            }
        );

        this.setData(currentData, voltageData, consumptionData as any);
    }
}
