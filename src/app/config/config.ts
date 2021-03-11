import { InjectionToken } from '@angular/core';

export interface Config {
    environment: {
        apiUrl: string;
    }
}

export const ENV_CONFIG = new InjectionToken<Config>('EnvironmentConfig');