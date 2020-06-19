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

@NgModule({
    imports: [
        CoreModule,
        RouterModule
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
    ],
    entryComponents: [
        TimeFrameComponent,
        DataComponent
    ]
})
export class ComponentsModule {}
