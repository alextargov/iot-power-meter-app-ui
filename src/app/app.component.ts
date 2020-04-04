import { Component, OnInit } from '@angular/core';

import { MeasurementService } from './shared/services/measurement/measurement.service';
import { IMeasurement } from './shared/services/measurement/measurement.interface';
import { ICurrent } from './shared/interfaces/current.interface';
import { IVoltage } from './shared/interfaces/voltage.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public measurementData: IMeasurement[];
    public currentData: ICurrent[];
    public voltageData: IVoltage[];
    public consumptionData: IVoltage[];
    public timeFrame: any;

    constructor(private readonly measurementService: MeasurementService) {}

    public ngOnInit(): any {
        this.getData();
    }

    public onTimeFrameChange(event: any): void {
        this.timeFrame = event;

        this.getData();
    }

    private getData(): void {
        this.measurementService.getMeasurements(this.timeFrame)
            .subscribe((measurements) => {
                this.measurementData = measurements;

                const { currentData, voltageData, consumptionData } = measurements.reduce((collection, currentElement) => ({
                    ...collection,
                    currentData: [
                        ...collection.currentData,
                        {
                            date: currentElement.createdAt,
                            value: currentElement.current
                        }
                    ],
                    voltageData: [
                        ...collection.voltageData,
                        {
                            date: currentElement.createdAt,
                            value: currentElement.voltage
                        }
                    ],
                    consumptionData: [
                        ...collection.voltageData,
                        {
                            date: currentElement.createdAt,
                            value: currentElement.voltage * currentElement.current
                        }
                    ]
                }), { currentData: [], voltageData: [], consumptionData: [] });

                this.currentData = currentData;
                this.voltageData = voltageData;
                this.voltageData = consumptionData;
            });
    }
}
