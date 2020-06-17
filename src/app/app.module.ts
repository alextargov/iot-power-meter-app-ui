import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import 'amcharts3/amcharts/amcharts.js';
import 'amcharts3/amcharts/serial.js';
import 'amcharts3/amcharts/xy.js';
import 'amcharts3/amcharts/pie.js';
import 'amcharts3/amcharts/themes/light.js';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { DevicesModule } from './modules/devices/devices.module';
import { JwtModule } from '@auth0/angular-jwt';

export const tokenGetter = () => {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AmChartsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
            },
        }),

        // Material
        CoreModule,
        BrowserAnimationsModule,

        SharedModule,
        StatisticsModule,
        AuthModule,
        DevicesModule,
    ],
    providers: [
        {
            provide: 'app.config',
            // tslint:disable-next-line no-string-literal
            useFactory: () => window['_env_'],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
