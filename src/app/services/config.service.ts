import { Inject, Injectable } from '@angular/core';
import { Config, ENV_CONFIG } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiUrl: string;

  constructor(@Inject(ENV_CONFIG) private config: Config) {
    this.apiUrl = config.environment.apiUrl;
  }
}
