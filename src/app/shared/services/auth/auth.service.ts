import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { IUser } from './user.interface';

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
}
