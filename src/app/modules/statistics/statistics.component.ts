import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CronJob } from 'cron';
import * as moment from 'moment';

import { IVoltage } from '../../shared/interfaces/voltage.interface';
import { ICurrent } from '../../shared/interfaces/current.interface';
import { IConsumption } from '../../shared/interfaces/consumption.interface';
import { MeasurementService } from '../../shared/services/measurement/measurement.service';
import { TimeFrames } from '../../shared/services/timeFrame/time-frames.enum';
import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
    public currentData: ICurrent[] = [];
    public voltageData: IVoltage[] = [];
    public consumptionData: IConsumption[] = [];
    public timeFrame: any;
    private job: CronJob;

    constructor(private readonly measurementService: MeasurementService, private zone: NgZone) {
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
        if (this.timeFrame) {
            this.getData(this.timeFrame);
        }
        setTimeout(() => this.getData(this.timeFrame), 1000);
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
            });
    }

    private setData(currentData: ICurrent[], voltageData: IVoltage[], consumptionData: IConsumption[]): void {
        this.consumptionData = consumptionData;
        this.voltageData = voltageData;
        this.currentData = currentData;
    }
}
