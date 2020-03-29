import { NgModule } from '@angular/core';

import { TimeFrameComponent } from './time-frame/time-frame.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        TimeFrameComponent
    ],
    exports: [
        TimeFrameComponent
    ],
    entryComponents: [
        TimeFrameComponent
    ]
})
export class ComponentsModule {}
