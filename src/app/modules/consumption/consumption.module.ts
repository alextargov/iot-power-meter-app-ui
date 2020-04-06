import { NgModule } from '@angular/core';

import { ConsumptionComponent } from './consumption.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        ConsumptionComponent,
    ],
    exports: [
        ConsumptionComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ConsumptionModule {}
