import { NgModule } from '@angular/core';

import { VoltageComponent } from './voltage.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        VoltageComponent,
    ],
    exports: [
        VoltageComponent
    ],
    imports: [
        SharedModule
    ]
})
export class VoltageModule {}
