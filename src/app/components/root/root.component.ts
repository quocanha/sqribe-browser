import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../modules/auth/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/users`).toPromise().then(
      (data) => {
        console.log(data);
      }
    );
  }

  logout() {
    this.auth.logout();
    document.location.href = "/";
  }
}
