import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Error} from "tslint/lib/error";

@Injectable()
export class ConfigService {

  configUrl = "assets/config.json";
  config: any;

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get(this.configUrl).toPromise().then(
      (data) => {
        this.config = data
      }
    );
  }

  getKey(key: string) {
    if(this.config[key] == undefined) {
      throw new Error(`[ConfigService] Key(${key}) not found.`);
    }

    return this.config[key];
  }
}
