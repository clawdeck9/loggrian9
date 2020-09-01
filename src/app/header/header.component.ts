import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'loggrian';
  isAuthenticated = false;
  authSubs: Subscription;

  constructor(private auth: AuthService){

  }

  ngOnInit(){
    this.authSubs = this.auth.userLoggedIn.subscribe( user => this.isAuthenticated = !!user );
  }

}
