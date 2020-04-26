import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    exports: [
        StatisticsComponent
    ],
    imports: [
        SharedModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule {}
