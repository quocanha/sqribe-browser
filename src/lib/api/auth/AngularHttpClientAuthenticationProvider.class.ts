import {AuthenticationProvider} from "./AuthenticationProvider.interface";
import {Authentication} from "./Authentication.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UsernameAndPasswordAuthenticationToken} from "./UsernameAndPasswordAuthenticationToken";

export class AngularHttpClientAuthenticationProviderClass implements AuthenticationProvider {

  constructor(private http: HttpClient, private baseUrl: string) {
  }

  authenticate(authentication: Authentication) {

    let body = new HttpParams()
      .append("grant_type", "password")
      .append("scope", "any")
      .append("username", authentication.getPrincipal())
      .append("password", authentication.getCredentials());

    let options = {
      headers : new HttpHeaders()
        .append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
        .append("Authorization", "Basic dHJ1c3RlZC1hcHA6c2VjcmV0")
    };

    return this.http.post(
      this.baseUrl + "/oauth/token",
      body,
      options
    ).toPromise()
      .then(
      (token_details) => {
        return this.http.get(
          this.baseUrl + "/auth/principal",
          {
            headers: new HttpHeaders()
              .append("Authorization", `Bearer ${token_details['access_token']}`)
          }
        ).toPromise().then(
          (principal) => {
            let token = new UsernameAndPasswordAuthenticationToken(
              authentication.getPrincipal(),
              // authentication.getCredentials()
              null // Erase credentials.
            );

            let details = {
              token_details: token_details,
              principal: principal
            };

            token.setDetails(details);

            return token;
          }
        );
      },
        (error) => {
          console.log(error);
        }
    );
  }
}
