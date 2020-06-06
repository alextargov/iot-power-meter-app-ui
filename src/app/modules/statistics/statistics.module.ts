import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    exports: [
        StatisticsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule {}
