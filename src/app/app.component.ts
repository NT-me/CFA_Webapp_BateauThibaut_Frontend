import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetBateau';
  logged = false;


  ngOnInit(): void {
    if (localStorage.getItem("authToken") == null){
      this.logged = false;
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
