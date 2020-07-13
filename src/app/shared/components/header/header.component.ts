import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { AuthService } from '../../services/auth/auth.service';
import { IUserAlarm } from '../../services/auth/user.interface';
import { AlarmsModalComponent } from '../alarms-modal/alarms-modal.component';
import { SubscribedComponent } from '../subscribed/subscribed.component';
import { takeUntil, switchMap } from 'rxjs/operators';
import { SocketService } from '../../services/socket/socket.service';
import { SocketEvent } from '../../constants/socket.constant';
import { MeasurementService } from '../../services/measurement/measurement.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
})
export class HeaderComponent extends SubscribedComponent implements OnInit {
    public userAlarms: IUserAlarm[] = [];
    public notReadAlarms: number;

    private alarmModalRef: MatDialogRef<AlarmsModalComponent>;

    constructor(
        private readonly dialog: MatDialog,
        private readonly authService: AuthService,
        private readonly socketService: SocketService,
        private readonly measurementService: MeasurementService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.authService.getUserAlarms()
            .subscribe((userAlarms) => {
                this.setAlarms(userAlarms);
            });

        this.socketService.onEvent(SocketEvent.ALARM)
            .subscribe((alarm) => {
                this.setAlarms([...this.userAlarms, alarm]);

                if (this.alarmModalRef) {
                    this.alarmModalRef.componentInstance.userAlarms = this.userAlarms;
                    this.alarmModalRef.componentInstance.ngOnInit();
                }
            });
    }

    public openUserModal(): void {
        this.dialog.open(UserModalComponent, {
            maxWidth: '650px',
            width: '500px',
        });
    }

    public openAlarmsModal(): void {
        this.alarmModalRef = this.dialog.open(AlarmsModalComponent, {
            data: {
                userAlarms: this.userAlarms,
            },
            width: '550px',
        });

        this.alarmModalRef.componentInstance.onReadAll
            .pipe(
                switchMap(() => this.authService.markUserAlarmAsRead()),
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((newAlarms) => {
                this.setAlarms(newAlarms);
                this.alarmModalRef.componentInstance.userAlarms = newAlarms;
                this.alarmModalRef.componentInstance.ngOnInit();
            });
    }

    private setAlarms(userAlarms: IUserAlarm[]): void {
        this.userAlarms = userAlarms;
        this.notReadAlarms = this.userAlarms.filter((alarm) => !alarm.read).length;
    }
}
