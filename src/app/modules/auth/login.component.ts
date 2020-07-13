import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { take, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SubscribedComponent } from '../../shared/components/subscribed/subscribed.component';
import { LoadingOverlayService } from '../../shared/services/loading-overlay/loading-overlay.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent extends SubscribedComponent implements OnInit {
    public loginForm: FormGroup;
    public isLoginButtonDisabled = true;

    constructor(
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
        private readonly loadingOverlayService: LoadingOverlayService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.loadingOverlayService.hide();

        this.loginForm = this.fb.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
        // username alex
        // password targov

        this.loginForm.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(() => {
                this.isLoginButtonDisabled = this.loginForm.invalid;
            });
    }

    public login(): void {
        if (this.loginForm.valid) {
            const username = this.loginForm.get('username').value;
            const password = this.loginForm.get('password').value;
            this.authService.login({ username, password })
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe((loginData) => {
                    sessionStorage.setItem('access_token', loginData.token);
                    location.href = '';
                });
        }
    }
}
