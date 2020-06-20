import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    exports: [
        StatisticsComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule {}
