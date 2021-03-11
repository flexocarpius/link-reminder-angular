import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, ENV_CONFIG } from './config';

@NgModule({
    imports: [CommonModule]
  })
  export class ConfigModule {
    static forRoot(config: Config): ModuleWithProviders<ConfigModule> {
      return {
        ngModule: ConfigModule,
        providers: [
          {
            provide: ENV_CONFIG,
            useValue: config
          }
        ]
      };
    }
  }