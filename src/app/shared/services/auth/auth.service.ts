import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IUser } from './user.interface';

@Injectable()
export class AuthService  {
    public readonly route = '/user';

    constructor(private readonly apiService: ApiService) {
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
            user
        });
    }
}
