import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';

import { IUserAlarm } from '../../services/auth/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: 'alarms-modal.component.html',
    styleUrls: ['alarms-modal.component.scss'],
})
export class AlarmsModalComponent implements OnInit {
    public userAlarms: IUserAlarm[] = [];
    @Output() public onReadAll = new EventEmitter();
    @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) public sort: MatSort;

    public readonly displayedColumns: string[] = ['type', 'device', 'threshold', 'value', 'createdAt'];
    public dataSource: MatTableDataSource<IUserAlarm>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { userAlarms: IUserAlarm[] }) {
        this.userAlarms = data.userAlarms;
    }

    public ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.userAlarms);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
    }

    public clearAlarmNotifications(): void {
        this.onReadAll.emit();
    }
}
