import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IDevice } from './device.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DeviceService  {
    public readonly route = '/device';

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
    ) {}

    public getDevices(): Observable<IDevice[]> {
        return this.apiService.request(this.route);
    }

    public getDeviceById(id: string): Observable<IDevice> {
        return this.apiService.request(this.route, {
            data: { id }
        });
    }

    public getDeviceByUserId(userId: string): Observable<IDevice[]> {
        return this.apiService.request(`${this.route}/user/${userId}`);
    }

    public createDevice(data: IDevice): Observable<{ data: IDevice, error: number }> {
        const hydratedData: IDevice = {
            ...data,
            userId: this.authService.getUser()._id
        };

        return this.apiService.request(`${this.route}`, {
            method: 'post',
            data: hydratedData
        });
    }

    public updateDevice(id: string, data: IDevice): Observable<{ data: IDevice, error: number }> {
        return this.apiService.request(`${this.route}/${id}`, {
            method: 'put',
            data
        });
    }

    public deleteDevice(id: string): Observable<void> {
        return this.apiService.request(`${this.route}/${id}`, {
            method: 'delete',
        });
    }
}
