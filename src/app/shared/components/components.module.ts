import { NgModule } from '@angular/core';

import { TimeFrameComponent } from './time-frame/time-frame.component';
import { CoreModule } from '../../core/core.module';
import { DataComponent } from './data/data.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { VoltageComponent } from './voltage/voltage.component';
import { CurrentComponent } from './current/current.component';

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        ConsumptionComponent,
        CurrentComponent,
        VoltageComponent,
        TimeFrameComponent,
        DataComponent
    ],
    exports: [
        ConsumptionComponent,
        CurrentComponent,
        VoltageComponent,
        TimeFrameComponent,
        DataComponent
    ],
    entryComponents: [
        TimeFrameComponent,
        DataComponent
    ]
})
export class ComponentsModule {}
