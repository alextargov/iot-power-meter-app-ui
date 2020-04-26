import { Component, Input } from '@angular/core';

import { ITimeFrame } from '../../services/timeFrame/time-frame.interface';
import { IVoltage } from '../../interfaces/voltage.interface';

@Component({
    selector: 'app-voltage',
    templateUrl: 'voltage.component.html',
    styleUrls: ['voltage.component.scss'],
})
export class VoltageComponent {
    @Input() public data: IVoltage[];
    @Input() public timeFrame: ITimeFrame;

    public readonly title = 'Voltage';
    public readonly config = {
        title: 'Voltage (V)',
        balloonText: 'Voltage:'
    }
}
