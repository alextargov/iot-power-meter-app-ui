import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { take } from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    constructor(private readonly authService: AuthService) {}

    public ngOnInit(): void {
        this.authService.login({
            username: 'alex',
            password: 'targov'
        })
        .subscribe((loginData) => {
            sessionStorage.setItem('access_token', loginData.token);
        });
    }
}
