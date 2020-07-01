import { NgModule } from '@angular/core';

import { TimeFrameComponent } from './time-frame/time-frame.component';
import { CoreModule } from '../../core/core.module';
import { DataComponent } from './data/data.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { VoltageComponent } from './voltage/voltage.component';
import { CurrentComponent } from './current/current.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { AlarmsModalComponent } from './alarms-modal/alarms-modal.component';
import { MatTableModule } from '@angular/material/table';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
    imports: [
        CoreModule,
        RouterModule,
        MatTableModule,
        NgxMaterialTimepickerModule,
    ],
    declarations: [
        ConsumptionComponent,
        CurrentComponent,
        VoltageComponent,
        TimeFrameComponent,
        DataComponent,
        HeaderComponent,
        NavigationComponent,
        DeviceComponent,
        UserModalComponent,
        AlarmsModalComponent,
        LoadingOverlayComponent
    ],
    exports: [
        ConsumptionComponent,
        CurrentComponent,
        VoltageComponent,
        TimeFrameComponent,
        DataComponent,
        HeaderComponent,
        NavigationComponent,
        DeviceComponent,
        UserModalComponent,
        AlarmsModalComponent,
        LoadingOverlayComponent,
    ],
    entryComponents: [
        TimeFrameComponent,
        DataComponent
    ]
})
export class ComponentsModule {}
