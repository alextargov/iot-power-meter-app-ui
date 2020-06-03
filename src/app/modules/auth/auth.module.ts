import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        AuthRoutingModule,
    ]
})
export class AuthModule {}
