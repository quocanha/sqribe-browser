import { Authentication } from "./Authentication.interface";
import { AuthenticationProvider } from "./AuthenticationProvider.interface";


export class AuthenticationManager {

  private authentication;

  constructor(private providers: AuthenticationProvider[]) {
    if(providers == null || providers.length == 0) {
      throw new Error("[AuthenticationManager] Providers cannot be null.");
    }
  }

  authenticate(authentication: Authentication) {
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
}
