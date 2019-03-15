import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router, private logger: NGXLogger) {
    // Change this function to take it's parameters from user input fields.
  }

  public onLogin() {
    this.auth.authenticate("admin", "admin").then(
      (authenticated) => {
        this.logger.log("[LoginComponent] Authentication successfull.");

        // Redirect user to home screen.
        this.router.navigate(["/"]);
      },
      (error) => {
        // Show error.
      }
    );
    return false;
  }
}
