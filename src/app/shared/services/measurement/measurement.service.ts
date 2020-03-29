import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IMeasurement } from './measurement.interface';

@Injectable()
export class MeasurementService  {
    public readonly route = '/measurement';

    constructor(private readonly apiService: ApiService) {
    }

    public getMeasurements(timeFrame): Observable<IMeasurement[]> {
        return this.apiService.request(this.route, { data: timeFrame });
    }

    public getApplianceMeasurements(appliance: string): Observable<[]> {
        return this.apiService.request(`${this.route}/${appliance}`);
    }

    public createMeasurement(measurementData: IMeasurement): Observable<IMeasurement> {
        return this.apiService.request(`${this.route}`, {
            method: 'post',
            measurementData
        });
    }
}
