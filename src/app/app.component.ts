import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public authToken: string;

    constructor(private readonly authService: AuthService) {}

    public ngOnInit(): void {
        this.authToken = this.authService.getToken();
    }
}
