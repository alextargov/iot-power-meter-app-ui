import { Component, OnInit, OnDestroy } from '@angular/core';
import { CronJob } from 'cron';
import * as moment from 'moment';

import { MeasurementService } from './shared/services/measurement/measurement.service';

import { TimeFrames } from './shared/services/timeFrame/time-frames.enum';

import { ICurrent } from './shared/interfaces/current.interface';
import { IVoltage } from './shared/interfaces/voltage.interface';
import { ITimeFrame } from './shared/services/timeFrame/time-frame.interface';
import { IConsumption } from './shared/interfaces/consumption.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public currentData: ICurrent[] = [];
    public voltageData: IVoltage[] = [];
    public consumptionData: IConsumption[] = [];
    public timeFrame: any;

    private job: CronJob;

    constructor(private readonly measurementService: MeasurementService) {
        this.job = new CronJob('*/5 * * * * *', () => {
            const lastData = this.voltageData.length ? this.voltageData[this.voltageData.length - 1].date : new Date();

            this.getData(
                {
                    frame: TimeFrames.custom,
                    startDate: moment.utc(lastData).subtract(moment().utcOffset(), 'minutes').add(1, 'second').toDate(),
                    endDate: moment.utc().endOf('day').toDate(),
                    wholeDay: false
                },
                true
            );
        });
    }

    public ngOnInit(): void {
        this.getData(this.timeFrame);


        this.job.start();
    }

    public onTimeFrameChange(event: any): void {
        this.timeFrame = event;

        this.getData(this.timeFrame);
    }

    public ngOnDestroy(): void {
        this.job.stop();
    }

    private async getData(
        timeFrame: ITimeFrame,
        append: boolean = false
    ): Promise<void> {
        this.measurementService.getMeasurements(timeFrame).subscribe((measurements) => {
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

            this.setData(currentData, voltageData, consumptionData, append);
        });
    }

    private setData(currentData: ICurrent[], voltageData: IVoltage[], consumptionData: IConsumption[], append: boolean): void {
        if (append) {
            this.consumptionData = [...this.consumptionData, ...consumptionData];
            this.currentData = [...this.currentData, ...currentData];
            this.voltageData = [...this.voltageData, ...voltageData];
        } else {
            this.consumptionData = consumptionData;
            this.voltageData = voltageData;
            this.currentData = currentData;
        }
    }
}
