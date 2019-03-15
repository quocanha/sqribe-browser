import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule} from "./modules/auth/auth.module";
import { SharedModule } from "./modules/shared/shared.module";
import { AuthService } from "./modules/auth/services/auth.service";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthHttpInterceptorService } from "./modules/auth/services/auth-http-interceptor.service";
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
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
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: AuthService,
      useClass: AuthService,
      deps: [HttpClient]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
