import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from './shared/services/auth/auth.service';
import { SocketService } from './shared/services/socket/socket.service';
import { SocketEvent } from './shared/constants/socket.constant';
import { BroadcasterService } from './shared/services/broadcaster/broadcaster.service';
import { broadcasterEvents } from './shared/constants/broadcaster-event.constants';

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
        private readonly broadcaster: BroadcasterService,
    ) { }

    public ngOnInit(): void {
        this.authToken = this.authService.getToken();
        this.socketService.initSocket();

        this.socketService.onEvent(SocketEvent.CONNECT)
            .subscribe(() => {
                this.socketService.send(SocketEvent.AUTH, this.authService.getUser()._id)
            });

        this.socketService.onEvent(SocketEvent.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });

        this.broadcaster.broadcast(broadcasterEvents.loadingOverlayState, true);
    }
}
