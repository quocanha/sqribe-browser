/**
 * Authentication interface to allow for the authentication library to be
 * agnostic from the actual authentication token.
 */
export interface Authentication  {

  authorities: [string];

  getAuthorities();

  getCredentials();

  getDetails();

  getPrincipal();

  isAuthenticated();

  setAuthenticated(isAuthenticated: boolean);
}
