import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { ConfigService } from '../../services/config/config.service';

@Component({
    selector: 'app-time-frame',
    templateUrl: 'time-frame.component.html',
    styleUrls: ['time-frame.component.scss']
})
export class TimeFrameComponent implements OnInit {
    private readonly configKey = 'timeFrames';
    public timeFrames: { frame: string, name: string }[];
    public selected = 'today';

    @Output() public timeFrameChangeEmitter: EventEmitter<any> = new EventEmitter();

    private datePickerStartDate: Date;
    private datePickerEndDate: Date;

    constructor(private readonly configService: ConfigService) {}

    public ngOnInit(): void {
        this.configService.get(this.configKey).subscribe((timeFrames) => {
            this.timeFrames = timeFrames.value;
            this.timeFrameChangeEmitter.emit({ frame: this.selected });
        });
    }

    public onTimeFrameChange(change: MatRadioChange): void {
        this.selected = change.value;
        this.timeFrameChangeEmitter.emit({ frame: this.selected });
    }

    public datePickerStartChange(change): void {
        this.datePickerStartDate = new Date(change);
        this.sendCustomDateEvent();
    }

    public datePickerEndChange(change): void {
        this.datePickerEndDate = new Date(change);
        this.sendCustomDateEvent();
    }

    private sendCustomDateEvent(): void {
        if (this.datePickerStartDate && this.datePickerEndDate) {
            this.timeFrameChangeEmitter.emit({
                frame: this.selected,
                startDate: this.datePickerStartDate,
                endDate: this.datePickerEndDate
            });
        }
    }
}
