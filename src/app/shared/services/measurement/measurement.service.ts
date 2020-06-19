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

    public getDeviceMeasurements(timeFrame, device: string): Observable<[]> {
        return this.apiService.request(`${this.route}/${device}`, {
            data: {
                timeFrame,
            }
        });
    }

    public createMeasurement(measurementData: IMeasurement): Observable<IMeasurement> {
        return this.apiService.request(`${this.route}`, {
            method: 'post',
            data: measurementData
        });
    }
}
