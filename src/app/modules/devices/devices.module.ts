import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
    declarations: [
        DevicesComponent,
    ],
    exports: [
        DevicesComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        DevicesRoutingModule
    ]
})
export class DevicesModule {}
