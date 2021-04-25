import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetBateau';
  logged = false;

  constructor(
    private router: Router  ) {
      
    }
  ngOnInit(): void {
    if (localStorage.getItem("authToken") == null){
      this.logged = false;
      this.router.navigate(['/home']);
    }
    else{
      this.logged = true;
    }
  }

  disconnect(){
    localStorage.removeItem("authToken")
    this.logged = false;
    window.location.reload();
  }
}
