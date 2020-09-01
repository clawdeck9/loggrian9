import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './app-login/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  userLoggedIn: BehaviorSubject<User>;

  constructor(private http: HttpClient) { 
    this.userLoggedIn = new BehaviorSubject<User>(null);
  }

  ngOnInit(){
  }

  get user() {
    return this.userLoggedIn;
  }


  nada(){
    return true;
  }

  login(name: string, password: string) {
    // temp: replace the credentials from the login form
    this.http.post<any>('http://localhost:8080/login', 
      { "username": "user", "password": "pass" },  
      {
        observe:'response',
        responseType: 'json',
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleError), 
        tap(resData => { 
        const jwt: string = resData.headers.get('authorization');
        console.log('this one when the user logs in: ', jwt);
        // decode the user name here 
        const newUser = new User(name, jwt);
        this.userLoggedIn.next(newUser);
      }))
      .subscribe();
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
