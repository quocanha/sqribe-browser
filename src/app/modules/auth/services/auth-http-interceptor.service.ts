import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {AuthService} from "./auth.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {
    console.log(`[AuthHttpInterceptorService] Initialized.`);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // Else if the request url is to the data api
    if(req.url.startsWith(environment.apiUrl)) {
      if(this.auth.isAuthenticated()) {
        req.headers = req.headers.append("Authorization", `Bearer ${this.auth.authentication.getDetails().token_details["access_token"]}`);
        return next.handle(req);
      }
    }

    // Else just pass the request on cleanly.
    console.log(`Interceptor working.`);
    return next.handle(req);
  }
}
