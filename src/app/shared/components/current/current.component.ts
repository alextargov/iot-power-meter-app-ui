import { Component, Input } from '@angular/core';

import { ICurrent } from '../../interfaces/current.interface';
import { ITimeFrame } from '../../services/timeFrame/time-frame.interface';

@Component({
    selector: 'app-current',
    templateUrl: 'current.component.html',
    styleUrls: ['current.component.scss'],
})
export class CurrentComponent {
    @Input() public data: ICurrent[];
    @Input() public timeFrame: ITimeFrame;

    public readonly title = 'Current';
    public readonly config = {
        title: 'Current (A)',
        balloonText: 'Current:'
    }
}
