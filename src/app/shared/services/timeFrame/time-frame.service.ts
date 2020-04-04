import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ITimeFrame } from './time-frame.interface';

@Injectable()
export class TimeFrameService  {
    public readonly route = '/timeFrame';

    constructor(private readonly apiService: ApiService) {
    }

    public getTimeFrame(timeFrame): Observable<{ [key: string]: ITimeFrame }> {
        return this.apiService.request(this.route, { data: timeFrame });
    }
}
