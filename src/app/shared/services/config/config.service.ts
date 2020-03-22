import { Injectable, Inject } from '@angular/core';
import { defaultsDeep } from 'lodash';

import { IConfigInterface } from './config.interface';

const defaultConfig: IConfigInterface = {
    APP_API_URL: 'http://localhost:3000',
};

@Injectable()
export class ConfigService {
    private readonly config: IConfigInterface;

    constructor(@Inject('app.config') appConfig: IConfigInterface) {
        this.config = defaultsDeep(appConfig, defaultConfig);
    }

    public get(key: string): string {
        return this.config[key];
    }
}
