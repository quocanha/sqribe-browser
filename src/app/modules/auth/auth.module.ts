import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [],
  exports: [
    LoginComponent
  ],
  providers: [AuthService],
  bootstrap: []
})
export class AuthModule {}
