import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationManager} from "../../../../lib/api/auth/AuthenticationManager.class";
import {AngularHttpClientAuthenticationProviderClass} from "../../../../lib/api/auth/AngularHttpClientAuthenticationProvider.class";
import {UsernameAndPasswordAuthenticationToken} from "../../../../lib/api/auth/UsernameAndPasswordAuthenticationToken";
import {Authentication} from "../../../../lib/api/auth/Authentication.interface";
import {ConfigService} from "../../shared/services/config.service";
import {Observable} from "rxjs/index";
import * as http from "http";

@Injectable()
export class AuthService {

  authentication: Authentication;
  redirectUrl: string;
  authenticationManager: AuthenticationManager;

  constructor(private http: HttpClient, private config: ConfigService) {
    let providers = [
      new AngularHttpClientAuthenticationProviderClass(http, config.getKey("apiUrl"))
    ];
    this.authenticationManager = new AuthenticationManager(providers);
  }

  authenticate(username: String, password: String) {
    let auth: Authentication = new UsernameAndPasswordAuthenticationToken(username, password);

    return this.authenticationManager.authenticate(auth).then(
      (authentication) => {
        this.authentication = authentication;
      }
    );
  }

  isAuthenticated(): boolean {
    return !!this.authentication;
  }
}
