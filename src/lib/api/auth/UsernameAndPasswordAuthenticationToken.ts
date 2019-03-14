import {Authentication} from "./Authentication.interface";

export class UsernameAndPasswordAuthenticationToken implements Authentication {
  authorities: [string];

  authenticated: boolean;
  details: any;

  constructor(private username: String, private password: String) {

  }

  setAuthorities(authorities) {
   this.authorities = authorities;
  }

  getAuthorities() {
    return this.authorities;
  }

  /**
   * The credentials contains data concerned with verifying the user is who
   * he claims to be (in other words, the principal).
   *
   * @returns {String}
   */
  getCredentials(): String {
    return this.password;
  }

  getDetails() {
    return this.details;
  }

  setDetails(details) {
    this.details = details;
  }

  /**
   * The principal is the user to be authenticated.
   *
   * @returns {String}
   */
  getPrincipal(): String {
    return this.username;
  }

  isAuthenticated(): boolean {
    return this.authenticated
  }

  setAuthenticated(authenticated: boolean): void {
    this.authenticated = authenticated;
  }
}
