import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import slugify from 'slugify';

import { IDevice } from '../../services/device/device.interface';
import { DeviceService } from '../../services/device/device.service';

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

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly deviceService: DeviceService
    ) {}

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: new FormControl(this.device.name || '', Validators.required),
            key: new FormControl(this.device.key || '', Validators.required),
            description: new FormControl(this.device.description || '', Validators.required),
            isRunning: new FormControl(this.device.isRunning || false)
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

    private resetDevice(): void {
        this.formGroup.reset(this.device);
        this.panelOpenState = false;
    }

    private slugifyName(name: string, removeCriteria: RegExp): string {
        return slugify(name, {
            replacement: '-',
            remove: removeCriteria,
            lower: true,
        });
    }
}
