import { NgModule } from '@angular/core';

import { ApiService } from './api/api.service';
import { ConfigService } from './config/config.service';
import { MeasurementService } from './measurement/measurement.service';

@NgModule({
    providers: [
        ApiService,
        ConfigService,
        MeasurementService
    ],
})
export class ServicesModule {}
