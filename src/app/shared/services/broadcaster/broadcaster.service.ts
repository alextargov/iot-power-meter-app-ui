import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IBroadcastEvent } from '../../interfaces/broadcast-event.interface';

export class BroadcasterService {
    private readonly eventBus: Subject<IBroadcastEvent>;

    constructor() {
        this.eventBus = new Subject<IBroadcastEvent>();
    }

    public broadcast(key: string, data?: any): void {
        this.eventBus.next({ key, data });
    }

    public on<T>(key: string): Observable<T> {
        return this.eventBus.asObservable()
            .pipe(
                filter((event) => event.key === key),
                map((event) => event.data as T)
            );
    }
}
