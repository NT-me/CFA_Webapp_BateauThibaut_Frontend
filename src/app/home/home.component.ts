import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authFORM
  lname
  lpass
  logged
  authToken
  test

  constructor(public auth: AuthentificationService) {
    this.authFORM = new FormData();

    this.authFORM.set("grant_type", "");
    this.authFORM.set("username", "");
    this.authFORM.set("password", "");
    this.authFORM.set("scope", "");
    this.authFORM.set("client_id", "");
    this.authFORM.set("client_secret", "");

    this.lname = "";
    this.lpass = "";

    this.logged = false;

    this.authToken = "";
 }

  ngOnInit(): void {
  }

  sendTokenReq(): void {
    this.authFORM.set("username", this.lname);
    this.authFORM.set("password", this.lpass);
    console.log(this.authFORM);
    this.auth.retrieveToken(this.authFORM).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",val);
        this.lname = "";
        this.lpass = "";
        this.logged = true;
        this.authToken = val["access_token"]
      },
        response => {
          console.log("POST call in error", response);
      },
        () => {
          console.log("The POST observable is now completed.");
      });
  }


}
