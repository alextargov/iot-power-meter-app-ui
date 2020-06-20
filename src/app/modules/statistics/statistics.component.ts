import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CronJob } from 'cron';
import * as moment from 'moment';

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
import { MatSelectChange } from '@angular/material/select';
import { SubscribedComponent } from '../../shared/components/subscribed/subscribed.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends SubscribedComponent implements OnInit, OnDestroy {
    public currentData: ICurrent[] = [];
    public voltageData: IVoltage[] = [];
    public consumptionData: IConsumption[] = [];
    public timeFrame: any;
    public devices: IDevice[];
    public selectedDevice: string;

    private job: CronJob;
    private user: IUser;

    constructor(
        private readonly measurementService: MeasurementService,
        private zone: NgZone,
        private readonly deviceService: DeviceService,
        private readonly authService: AuthService,
    ) {
        super();

        this.job = new CronJob('*/5 * * * * *', () => {
            const lastData = this.voltageData.length ? this.voltageData[this.voltageData.length - 1].date : new Date();

            this.getData(
                {
                    frame: TimeFrames.custom,
                    startDate: moment.utc(lastData).subtract(moment().utcOffset(), 'minutes').add(1, 'second').toDate(),
                    endDate: moment.utc().endOf('day').toDate(),
                    wholeDay: false
                },
            );

        });
    }

    public ngOnInit(): void {
        this.user = this.authService.getUser();

        if (this.user) {
            this.deviceService.getDeviceByUserId(this.user._id)
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe((devices) => {
                    this.devices = devices;
                });
        }

        if (this.timeFrame) {
            this.getData(this.timeFrame);
        }

        // setTimeout(() => this.getData(this.timeFrame), 1000);
        this.job.start();
    }

    public onTimeFrameChange(event: any): void {
        this.timeFrame = event;
        console.log(event);
        this.getData(this.timeFrame);
    }

    public ngOnDestroy(): void {
        this.job.stop();
    }

    private async getData(
        timeFrame: ITimeFrame,
    ): Promise<void> {
        this.measurementService.getMeasurements(timeFrame)
            .subscribe((measurements) => {
                if (!measurements.length) {
                    return;
                }

                this.aggregateData(measurements);
            });
    }

    private async getDeviceData(
        timeFrame: ITimeFrame,
        selectedDevice: string,
    ): Promise<void> {
        this.measurementService.getDeviceMeasurements(timeFrame, selectedDevice)
            .subscribe((measurements) => {
                if (!measurements.length) {
                    return;
                }

                this.aggregateData(measurements);
            });
    }

    public async onDeviceChange(event: MatSelectChange): Promise<void> {
        event.value ?
            await this.getDeviceData(this.timeFrame, event.value) :
            await this.getData(this.timeFrame);
    }

    private setData(currentData: ICurrent[], voltageData: IVoltage[], consumptionData: IConsumption[]): void {
        this.consumptionData = consumptionData;
        this.voltageData = voltageData;
        this.currentData = currentData;
    }

    private aggregateData(measurements): void {
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
