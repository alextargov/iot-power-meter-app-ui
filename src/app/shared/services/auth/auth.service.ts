import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IUser, IUserAlarm } from './user.interface';

@Injectable()
export class AuthService  {
    public readonly route = '/user';

    constructor(
        private readonly apiService: ApiService,
        private readonly jwtService: JwtHelperService,
    ) {
    }

    public login(user: IUser): Observable<{ token: string }> {
        return this.apiService.request(`${this.route}/login`, {
            method: 'post',
            data: user
        });
    }

    public register(user: IUser): Observable<void> {
        return this.apiService.request(`${this.route}/register`, {
            method: 'post',
            data: user
        });
    }

    public getToken(): string {
        return sessionStorage.getItem('access_token');
    }

    public getUser(): IUser {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        return this.jwtService.decodeToken(token);
    }

    public getUserAlarms(): Observable<IUserAlarm[]> {
        const user = this.getUser();

        if (!user) {
            return of([]);
        }

        return this.apiService.request(`${this.route}/${user._id}/alarms`, { method: 'get' });
    }

    public markUserAlarmAsRead(): Observable<IUserAlarm[]> {
        const user = this.getUser();

        if (!user) {
            return of([]);
        }

        return this.apiService.request(`${this.route}/${user._id}/alarms/read`, { method: 'post' });
    }
}
