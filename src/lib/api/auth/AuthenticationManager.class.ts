import {PasswordEncoder} from "./PasswordEncoder.interface";
import {Authentication} from "./Authentication.interface";
import {AuthenticationProvider} from "./AuthenticationProvider.interface";
import {Exclusion} from "tslint/lib/rules/completed-docs/exclusion";


export class AuthenticationManager {

  private authentication;
  private passwordEncoder: PasswordEncoder;

  constructor(private providers: AuthenticationProvider[]) {
    if(providers == null || providers.length == 0) {
      throw new Error("[AuthenticationManager] Providers cannot be null.");
    }
  }

  authenticate(authentication: Authentication) {
    let result = null;

    // for(let provider of this.providers) {
    //   result = provider.authenticate(authentication);
    //
    //   if(result) {
    //     break
    //   }
    // }

    return this.providers[0].authenticate(authentication).then(
      (authentication) => {
        this.authentication = authentication;
        return authentication;
      }
    );
  }

  isAuthenticated() {
    return !!this.authentication;
  }
}
