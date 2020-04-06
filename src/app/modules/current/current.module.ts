import { NgModule } from '@angular/core';

import { CurrentComponent } from './current.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        CurrentComponent,
    ],
    exports: [
        CurrentComponent
    ],
    imports: [
        SharedModule
    ]
})
export class CurrentModule {}
