import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
    constructor(public dialog: MatDialog) {}

    public openUserModal(): void {
        this.dialog.open(UserModalComponent, {
            data: {

            },
            maxWidth: '650px',
            width: '500px',
        });
    }

    public openNotificationsModal(): void {

    }

    public openAlarmModal(): void {
        this.dialog.open(UserModalComponent, {
            data: {

            },
            maxWidth: '650px',
            width: '500px',
        });
    }
}
