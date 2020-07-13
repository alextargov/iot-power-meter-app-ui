import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { IDevice } from '../../shared/services/device/device.interface';
import { SubscribedComponent } from '../../shared/components/subscribed/subscribed.component';
import { DeviceService } from '../../shared/services/device/device.service';
import { IUser } from '../../shared/services/auth/user.interface';
import { takeUntil } from 'rxjs/operators';
import { LoadingOverlayService } from '../../shared/services/loading-overlay/loading-overlay.service';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent extends SubscribedComponent implements OnInit {
    public devices: IDevice[];

    private user: IUser;

    constructor(
        private readonly authService: AuthService,
        private readonly deviceService: DeviceService,
        private readonly loadingOverlayService: LoadingOverlayService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.loadingOverlayService.show();

        this.user = this.authService.getUser();

        if (this.user) {
            this.deviceService.getDeviceByUserId(this.user._id)
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe((devices) => {
                    this.devices = devices;
                    setTimeout(() => {
                        this.loadingOverlayService.hide();
                    }, 300);
                });
        }
    }

    public appendNewDevice(device: IDevice): void {
        this.devices = [
            ...this.devices,
            device
        ];
    }

    public removeDevice(id: string): void {
        this.devices = this.devices.filter((device) => device._id !== id);
    }
}
