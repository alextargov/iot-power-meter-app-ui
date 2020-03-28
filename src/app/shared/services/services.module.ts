import { NgModule } from '@angular/core';

import { ApiService } from './api/api.service';
import { AppConfigService } from './app-config/app-config.service';
import { MeasurementService } from './measurement/measurement.service';
import { ConfigService } from './config/config.service';

@NgModule({
    providers: [
        ApiService,
        AppConfigService,
        ConfigService,
        MeasurementService
    ],
})
export class ServicesModule {}
