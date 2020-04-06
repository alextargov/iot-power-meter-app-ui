import { NgModule } from '@angular/core';

import { TimeFrameComponent } from './time-frame/time-frame.component';
import { CoreModule } from '../../core/core.module';
import { DataComponent } from './data/data.component';

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        TimeFrameComponent,
        DataComponent
    ],
    exports: [
        TimeFrameComponent,
        DataComponent
    ],
    entryComponents: [
        TimeFrameComponent,
        DataComponent
    ]
})
export class ComponentsModule {}
