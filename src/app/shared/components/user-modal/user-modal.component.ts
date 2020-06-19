import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../services/auth/user.interface';

@Component({
    templateUrl: 'user-modal.component.html',
    styleUrls: ['user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
    public form: FormGroup;
    private user: IUser;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authService: AuthService,
    ) {}

    public ngOnInit(): void {
        this.user = this.authService.getUser();

        if (!this.user) {
            return;
        }

        this.form = this.formBuilder.group({
            username: new FormControl({ value: this.user.username, disabled: true }),
            password: new FormControl(),
            newPassword: new FormControl(),
        });
    }
}
