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
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
export const tokenGetter = () => {
    return localStorage.getItem('access_token');
}

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
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
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
          },

          {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
