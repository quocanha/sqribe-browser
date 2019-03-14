import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./modules/auth/auth.module";
import {SharedModule} from "./modules/shared/shared.module";
import {AuthService} from "./modules/auth/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./modules/shared/services/config.service";

export function loadConfig(config: ConfigService): () => Promise<any> {
  return () => { return config.load(); }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [ConfigService]
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
