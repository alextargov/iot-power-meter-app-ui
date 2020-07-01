import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IMeasurement } from './measurement.interface';
import { LoadingOverlayService } from '../loading-overlay/loading-overlay.service';

@Injectable()
export class MeasurementService  {
    public readonly route = '/measurement';

    constructor(private readonly apiService: ApiService, private readonly loadingOverlayService: LoadingOverlayService) {
    }

    public getMeasurements(timeFrame, isCronRunning: boolean = false): Observable<IMeasurement[]> {
        if (!isCronRunning) {
            this.loadingOverlayService.show();
        }
        return this.apiService.request(this.route, { data: timeFrame })
    }

    public getDeviceMeasurements(timeFrame, device: string, isCronRunning: boolean = false): Observable<[]> {
        if (!isCronRunning) {
            this.loadingOverlayService.show();
        }

        return this.apiService.request(`${this.route}/${device}`, {
            data: timeFrame,
        });
    }

    public createMeasurement(measurementData: IMeasurement): Observable<IMeasurement> {
        return this.apiService.request(`${this.route}`, {
            method: 'post',
            data: measurementData
        });
    }
}
