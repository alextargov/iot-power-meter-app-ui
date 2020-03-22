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

    constructor(private readonly measurementService: MeasurementService) {}

    public ngOnInit(): any {
        this.measurementService.getMeasurements()
            .subscribe((measurements) => {
                this.measurementData = measurements;

                this.currentData = measurements.map((measurement) => ({
                    date: measurement.createdAt,
                    value: measurement.current
                }));
            });
    }
}
