import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
