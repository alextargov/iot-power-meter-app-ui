import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IConfig } from './config.interface';

@Injectable()
export class ConfigService {
    private readonly route = '/config';

    constructor(private readonly apiService: ApiService) {}

    public getAll(): Observable<IConfig[]> {
        return this.apiService.request(this.route);
    }

    public get(name: string): Observable<IConfig> {
        return this.apiService.request(`${this.route}/${name}`);
    }
}
