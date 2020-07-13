import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import slugify from 'slugify';
import { v4 as uuid4 } from 'uuid';

import { IDevice, IScheduledControl } from '../../services/device/device.interface';
import { DeviceService } from '../../services/device/device.service';
import { defaultDeviceHost } from '../../constants/device.constant';
import { MatDialog } from '@angular/material/dialog';
import { ScheduledControlModalComponent } from '../scheduled-control/scheduled-control-modal.component';
import { cloneDeep } from 'lodash';
import { ScheduledControlTimeFrameComponent } from '../scheduled-control-time-frame/scheduled-control-time-frame.component';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
    @Input() public device: IDevice;
    @Output() public onDeviceCreate = new EventEmitter<IDevice>();
    @Output() public onDeviceDelete = new EventEmitter<string>();

    @ViewChild(MatAccordion) accordion: MatAccordion;

    public formGroup: FormGroup;
    public panelOpenState = false;

    private originalDeviceData: IDevice;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly deviceService: DeviceService,
        private readonly dialog: MatDialog,
    ) {}

    public ngOnInit(): void {
        this.originalDeviceData = cloneDeep(this.device);

        this.initializeForm();

        this.formGroup.get('isCurrentAlarmEnabled').valueChanges.subscribe((isEnabled) => {
            if (isEnabled) {
                this.formGroup.get('currentAlarmThreshold').enable();

            } else {
                this.formGroup.get('currentAlarmThreshold').disable();
                this.formGroup.get('currentAlarmThreshold').setValue(null)
            }
        });

        this.formGroup.get('isVoltageAlarmEnabled').valueChanges.subscribe((isEnabled) => {
            if (isEnabled) {
                this.formGroup.get('voltageAlarmThreshold').enable();

            } else {
                this.formGroup.get('voltageAlarmThreshold').disable();
                this.formGroup.get('voltageAlarmThreshold').setValue(null)
            }
        });

        this.formGroup.get('isPowerAlarmEnabled').valueChanges.subscribe((isEnabled) => {
            if (isEnabled) {
                this.formGroup.get('powerAlarmThreshold').enable();

            } else {
                this.formGroup.get('powerAlarmThreshold').disable();
                this.formGroup.get('powerAlarmThreshold').setValue(null)
            }
        });

        if (this.device._id) {
            this.formGroup.controls.key.disable();
        }
    }

    public onSave(): void {
        const formData = this.formGroup.getRawValue();
        const dataToSave = {
            ...this.device,
            ...formData
        };

        const action = this.device._id ?
            this.deviceService.updateDevice(this.device._id, dataToSave) :
            this.deviceService.createDevice(dataToSave);

        action.subscribe((device) => {
            this.panelOpenState = false;

            if (this.device._id) {
                this.device = device;
            } else {
                this.resetDevice();
                this.onDeviceCreate.emit(device);
            }
        });
    }

    public onCancel(): void {
       this.resetDevice();
    }

    public onDelete(): void {
        this.deviceService.deleteDevice(this.device._id).subscribe(() => {
            this.onDeviceDelete.emit(this.device._id);
        });
    }

    public setDeviceKey(): void {
        const nameValue = this.formGroup.get('name').value;
        const keyValue = this.formGroup.get('key').value;
        if (!this.device._id && nameValue && !keyValue) {
            this.formGroup.get('key').setValue(this.slugifyName(nameValue, /[*+~_&^?|()'"!:@%$±{}^$\[\]]/g));
        }
    }

    public openScheduledControlModal(): void {
        const dialogRef = this.dialog.open(ScheduledControlModalComponent, {
            maxWidth: '850px',
            width: '750px',
            data: this.device.scheduledControl
        });

        dialogRef.afterClosed()
            .pipe(take(1))
            .subscribe((result: IScheduledControl[]) => {
                if (result) {
                    this.device = {
                        ...this.device,
                        scheduledControl: result,
                    }
                }
        });
    }

    public openAddScheduledControlModal(): void {
        const dialogRef = this.dialog.open(ScheduledControlTimeFrameComponent, {
            maxWidth: '750px',
            data: this.device.scheduledControl
        });

        dialogRef.afterClosed()
            .pipe(take(1))
            .subscribe((result: IScheduledControl) => {
            if (result) {
                this.device = {
                    ...this.device,
                    scheduledControl: [...(this.device.scheduledControl || []), result],
                }
            }
        });
    }

    private resetDevice(): void {
        this.formGroup.reset(this.originalDeviceData);
        this.device = cloneDeep(this.originalDeviceData);
        this.initializeForm();
        this.panelOpenState = false;
    }

    private slugifyName(name: string, removeCriteria: RegExp): string {
        return slugify(name, {
            replacement: '-',
            remove: removeCriteria,
            lower: true,
        });
    }

    private initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            name: new FormControl(this.device.name || '', Validators.required),
            key: new FormControl(this.device.key || '', Validators.required),
            deviceId: new FormControl({
                value: this.device.deviceId || uuid4(),
                disabled: true
            }, Validators.required),
            host: new FormControl(this.device.host || defaultDeviceHost, Validators.required),
            description: new FormControl(this.device.description || '', Validators.required),
            isRunning: new FormControl(this.device.isRunning || false),
            isCurrentAlarmEnabled: new FormControl(this.device.isCurrentAlarmEnabled || false),
            isVoltageAlarmEnabled: new FormControl(this.device.isVoltageAlarmEnabled || false),
            isPowerAlarmEnabled: new FormControl(this.device.isPowerAlarmEnabled || false),
            currentAlarmThreshold: new FormControl({
                value: this.device.currentAlarmThreshold,
                disabled: !this.device.isCurrentAlarmEnabled
            }),
            voltageAlarmThreshold: new FormControl({
                value: this.device.voltageAlarmThreshold,
                disabled: !this.device.isVoltageAlarmEnabled
            }),
            powerAlarmThreshold: new FormControl({
                value: this.device.powerAlarmThreshold,
                disabled: !this.device.isPowerAlarmEnabled
            }),
        });
    }
}
