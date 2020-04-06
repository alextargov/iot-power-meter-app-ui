import { Component, Input } from '@angular/core';

import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';
import { IConsumption } from '../../shared/interfaces/consumption.interface';

@Component({
    selector: 'app-consumption',
    templateUrl: 'consumption.component.html',
    styleUrls: ['consumption.component.scss'],
})
export class ConsumptionComponent {
    @Input() public data: IConsumption[];
    @Input() public timeFrame: ITimeFrame;

    public readonly title = 'Consumption';
    public readonly config = {
        title: 'Consumption (W)',
        balloonText: 'Consumption:'
    }

    constructor() {}
}
