import { Injectable } from '@angular/core';

import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';

import { broadcasterEvents } from '../../constants/broadcaster-event.constants';

@Injectable()
export class LoadingOverlayService {
    private isVisible: boolean;

    constructor(private readonly broadcaster: BroadcasterService) {}

    public show(): void {
        this.announce(true);
    }

    public hide(): void {
        this.announce(false);
    }

    public get isOverlayVisible(): boolean {
        return this.isVisible;
    }

    private announce(isVisible: boolean): void {
        this.isVisible = isVisible;

        this.broadcaster.broadcast(broadcasterEvents.loadingOverlayState, isVisible);
    }
}
