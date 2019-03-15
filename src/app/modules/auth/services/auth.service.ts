import {Injectable} from '@angular/core';
import {AuthenticationManager} from "../../../../lib/api/auth/AuthenticationManager.class";
import {AngularHttpClientAuthenticationProviderClass} from "../../../../lib/api/auth/AngularHttpClientAuthenticationProvider.class";
import {UsernameAndPasswordAuthenticationToken} from "../../../../lib/api/auth/UsernameAndPasswordAuthenticationToken";
import {Authentication} from "../../../../lib/api/auth/Authentication.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {

  authentication: Authentication;
  redirectUrl: string;
  authenticationManager: AuthenticationManager;

  constructor(private http: HttpClient) {
    console.log(`[AuthService] Initializing...`);
    let providers = [
      new AngularHttpClientAuthenticationProviderClass(this.http, environment.apiUrl)
    ];
    this.authenticationManager = new AuthenticationManager(providers);
    console.log(`[AuthService] Finished initializing...`);
  }

  authenticate(username: String, password: String) {
    let auth: Authentication = new UsernameAndPasswordAuthenticationToken(username, password);
    return this.authenticationManager.authenticate(auth).then(
      (authentication) => {
        this.authentication = authentication;
        localStorage.setItem("authentication", JSON.stringify(authentication));
      }
    );
  }

  private getAuthenticationFromLocalStorage() {
    let storage = JSON.parse(localStorage.getItem("authentication"));
    if(storage != null) {
      let token = new UsernameAndPasswordAuthenticationToken(storage["details"]["principal"]["username"], "");
      token.setDetails(storage["details"]);
      this.authentication = token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    if(this.authentication != null) {
      return true;
    }
    return !!this.getAuthenticationFromLocalStorage();
  }

  logout() {
    localStorage.removeItem("authentication");
    this.authentication = null;
  }
}
