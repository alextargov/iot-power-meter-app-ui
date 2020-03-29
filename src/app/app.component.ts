import { Component, OnInit } from '@angular/core';

import { MeasurementService } from './shared/services/measurement/measurement.service';
import { IMeasurement } from './shared/services/measurement/measurement.interface';
import { ICurrent } from './shared/interfaces/current.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public measurementData: IMeasurement[];
    public currentData: ICurrent[];
    public timeFrame: any;

    constructor(private readonly measurementService: MeasurementService) {}

    public ngOnInit(): any {
        this.getData();
    }

    public onTimeFrameChange(event: any): void {
        console.log(event)
        this.timeFrame = event;
        this.getData();
    }

    private getData(): void {
        this.measurementService.getMeasurements(this.timeFrame)
            .subscribe((measurements) => {
                this.measurementData = measurements;

                this.currentData = measurements.map((measurement) => ({
                    date: measurement.createdAt,
                    value: measurement.current
                }));
            });
    }
}
