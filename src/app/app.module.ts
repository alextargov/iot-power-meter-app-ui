import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentModule } from './modules/current/current.module';
import { ServicesModule } from './shared/services/services.module';

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import 'amcharts3/amcharts/amcharts.js';
import 'amcharts3/amcharts/serial.js';
import 'amcharts3/amcharts/xy.js';
import 'amcharts3/amcharts/pie.js';
import 'amcharts3/amcharts/themes/light.js';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AmChartsModule,
        HttpClientModule,

        ServicesModule,
        CurrentModule
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
