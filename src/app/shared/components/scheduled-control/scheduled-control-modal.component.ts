import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { IScheduledControl } from '../../services/device/device.interface';

@Component({
    templateUrl: 'scheduled-control-modal.component.html',
    styleUrls: ['scheduled-control-modal.component.scss'],
})
export class ScheduledControlModalComponent implements OnInit {
    public scheduledControls: IScheduledControl[] = [];
    public form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IScheduledControl[],
        private fb: FormBuilder
    ) {
        if (data) {
            this.scheduledControls = [...data];
        }
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            scheduledControls: this.fb.array(this.buildFormArray(this.scheduledControls))
        });
    }

    public deleteControl(index: number): void {
        (this.form.get('scheduledControls') as FormArray).removeAt(index);
    }

    private buildFormArray(scheduledControls: IScheduledControl[]): FormGroup[] {
        return scheduledControls.map((scheduledControl) => {
            return this.fb.group({
                startDate: new FormControl(moment(scheduledControl.startDate).format('LL')),
                endDate: new FormControl(moment(scheduledControl.endDate).format('LL')),
                startTime: new FormControl(scheduledControl.startTime),
                endTime: new FormControl(scheduledControl.endTime),
            });
        });
    }
}
