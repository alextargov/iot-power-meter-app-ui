import { NgModule } from '@angular/core';

import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { InterceptorsModule } from './interceptors/interceptors.module';

@NgModule({
    imports: [
        ComponentsModule,
        ServicesModule,
        InterceptorsModule,
    ],
    exports: [
        ComponentsModule,
        ServicesModule,
        InterceptorsModule
    ]
})

export class SharedModule {}
