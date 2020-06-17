import { NgModule } from '@angular/core';

import { ApiService } from './api/api.service';
import { AppConfigService } from './app-config/app-config.service';
import { MeasurementService } from './measurement/measurement.service';
import { ConfigService } from './config/config.service';
import { TimeFrameService } from './timeFrame/time-frame.service';
import { ChartService } from './chart/chart.service';
import { AuthService } from './auth/auth.service';
import { DeviceService } from './device/device.service';

@NgModule({
    providers: [
        ApiService,
        AppConfigService,
        ConfigService,
        MeasurementService,
        TimeFrameService,
        ChartService,
        AuthService,
        DeviceService,
    ],
})
export class ServicesModule {}
