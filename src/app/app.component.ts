import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from './shared/services/auth/auth.service';
import { SocketService } from './shared/services/socket/socket.service';
import { SocketEvent } from './shared/constants/socket.constant';
import { BroadcasterService } from './shared/services/broadcaster/broadcaster.service';
import { broadcasterEvents } from './shared/constants/broadcaster-event.constants';
import { LoadingOverlayService } from './shared/services/loading-overlay/loading-overlay.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public authToken: string;

    constructor(
        private readonly authService: AuthService,
        private readonly socketService: SocketService,
        private readonly loadingOverlayService: LoadingOverlayService,
    ) { }

    public ngOnInit(): void {
        this.authToken = this.authService.getToken();
        this.socketService.initSocket();

        this.socketService.onEvent(SocketEvent.CONNECT)
            .subscribe(() => {
                const user = this.authService.getUser();
                if (user) {
                    this.socketService.send(SocketEvent.AUTH, user._id)
                }
            });

        this.socketService.onEvent(SocketEvent.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });

        this.loadingOverlayService.show();
    }
}
