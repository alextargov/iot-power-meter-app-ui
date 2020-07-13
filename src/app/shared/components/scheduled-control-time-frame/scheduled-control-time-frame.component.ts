import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-scheduled-control-time-frame',
    templateUrl: 'scheduled-control-time-frame.component.html',
    styleUrls: ['scheduled-control-time-frame.component.scss'],
})
export class ScheduledControlTimeFrameComponent {
    public scheduledControl = { startDate: new Date(), startTime: '00:00', endDate: new Date(), endTime: '23:59' };

    constructor() {}
}
