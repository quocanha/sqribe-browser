import {Authentication} from "./Authentication.interface";

export interface AuthenticationProvider {
  authenticate(authentication: Authentication);
}
