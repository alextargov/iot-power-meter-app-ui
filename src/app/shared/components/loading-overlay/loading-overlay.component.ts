import { Component } from '@angular/core';

import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { broadcasterEvents } from '../../constants/broadcaster-event.constants';

@Component({
    selector: 'app-loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.scss']
})

export class LoadingOverlayComponent {
    public visible = false;

    constructor(private readonly broadcasterService: BroadcasterService) {
        this.broadcasterService.on(broadcasterEvents.loadingOverlayState)
            .subscribe((visible: boolean) => {
                this.visible = visible;
            });
    }
}
