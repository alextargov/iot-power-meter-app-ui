import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
    template: ``,
})
export class SubscribedComponent implements OnDestroy {
    protected readonly componentDestroyed$ = new ReplaySubject<void>();

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
