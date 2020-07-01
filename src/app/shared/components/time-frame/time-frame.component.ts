import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

import { ConfigService } from '../../services/config/config.service';
import { TimeFrames } from '../../services/timeFrame/time-frames.enum';
import { SubscribedComponent } from '../subscribed/subscribed.component';

@Component({
    selector: 'app-time-frame',
    templateUrl: 'time-frame.component.html',
    styleUrls: ['time-frame.component.scss']
})
export class TimeFrameComponent extends SubscribedComponent implements OnInit {
    private readonly configKey = 'timeFrames';
    public timeFrames: { frame: string, name: string }[];
    public selected = 'today';
    public timeStart: any;
    public timeEnd: any;
    public timeMax: string;
    public timeMin: string;

    @Output() public timeFrameChangeEmitter: EventEmitter<any> = new EventEmitter();

    private datePickerStartDate: Date;
    private datePickerEndDate: Date;

    constructor(private readonly configService: ConfigService) {
        super();
    }

    public ngOnInit(): void {
        this.configService.get(this.configKey)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((timeFrames) => {
                this.timeFrames = timeFrames.value;
                this.timeFrameChangeEmitter.emit({ frame: this.selected });
            });
    }

    public onTimeFrameChange(change: MatRadioChange): void {
        this.selected = change.value;

        if (change.value !== TimeFrames.todayPartly && change.value !== TimeFrames.custom) {
            this.timeFrameChangeEmitter.emit({ frame: this.selected });
        }
    }

    public datePickerStartChange(change): void {
        this.datePickerStartDate = new Date(change);
        this.sendCustomDateEvent();
    }

    public datePickerEndChange(change): void {
        this.datePickerEndDate = new Date(change);
        this.sendCustomDateEvent();
    }

    public timePickerStartChange(change: string): void {
        if (this.selected === TimeFrames.todayPartly) {
            const [hour, minute] = change.split(':');
            const time = moment().hours(Number(hour)).minute(Number(minute));
        }
    }

    public timePickerEndChange(change): void {
        if (this.selected === TimeFrames.todayPartly) {

        }
    }

    public getTimeMaxRestriction(): void {
        if (this.selected === TimeFrames.todayPartly && this.timeStart && !this.timeEnd) {
            const [hour, minute] = this.timeStart.split(':');
            const time = moment().hours(Number(hour)).minute(Number(minute));

            const restrictedTime = time.add(4, 'hours');

            this.timeMax = restrictedTime.date() === time.date() ?
                `${restrictedTime.hours()}:${restrictedTime.minutes()}` :
                '24:00';
        }

        if (this.timeStart && this.timeEnd) {
            this.sendTodayDateEvent();
        }
    }

    public getTimeMinRestriction(): void {
        if (this.selected === TimeFrames.todayPartly && !this.timeStart && this.timeEnd) {
            const [hour, minute] = this.timeEnd.split(':');
            const time = moment().hours(Number(hour)).minute(Number(minute));

            const restrictedTime = time.subtract(4, 'hours');

            this.timeMin = restrictedTime.date() === time.date() ?
                `${restrictedTime.hours()}:${restrictedTime.minutes()}` :
                '00:00';
        }


        if (this.timeStart && this.timeEnd) {
            this.sendTodayDateEvent();
        }
    }

    public clearTimeStart(): void {
        this.timeStart = null;
        this.timeMax = null;
    }

    public clearTimeEnd(): void {
        this.timeEnd = null;
        this.timeMin = null;
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

    private sendTodayDateEvent(): void {
        const [startHours, startMinutes] = this.timeStart.split(':');
        const [endHours, endMinutes] = this.timeEnd.split(':');

        setTimeout(() => {
            this.timeFrameChangeEmitter.emit({
                frame: this.selected,
                startDate: moment().hours(startHours).minutes(startMinutes).toDate(),
                endDate: moment().hours(endHours).minutes(endMinutes).toDate(),
            });
        }, 100);

    }
}
