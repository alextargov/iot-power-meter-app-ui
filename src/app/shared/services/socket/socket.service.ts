import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

import { AppConfigService } from '../app-config/app-config.service';
import { SocketEvent } from '../../constants/socket.constant';

@Injectable()
export class SocketService {
    public apiUrl;
    private socket;

    constructor(private readonly appConfigService: AppConfigService) {
        this.apiUrl = this.appConfigService.get('APP_API_URL');
    }

    public initSocket(): void {
        this.socket = socketIo(this.apiUrl);
    }

    public send(event: SocketEvent, message: any): void {
        this.socket.emit(event, message);
    }

    public onEvent(event: SocketEvent): Observable<any> {
        return new Observable<SocketEvent>(observer => {
            this.socket.on(event, (data) => observer.next(data));
        });
    }
}
