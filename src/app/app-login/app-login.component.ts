import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

  loginForm: FormGroup;
// validators: check the required boolean state in the loginForm validator?
  constructor(private auth: AuthService) {
    this.loginForm = new FormGroup(
      {
        'username': new FormControl('', [Validators.required]),
        'password': new FormControl('')
      },
      [(form: AbstractControl) => {
        const { username, password } = form.value;
        console.log('values: ', username, password);
        if (password === "") {
          return { invalidPassword: true };
        } 
        // if (username.errors===undefined){
        //   return { invalidUsername: true};
        // }
        return null;
      }]

    )
  }

  ngOnInit() {
    // this.loginForm.get('errors')
   }

  get username(){
    return this.loginForm.value.username;
  }
  
  get password(){
    return this.loginForm.value.password;
  }


  onLogForm(){
    console.log('onLogForm(): ', this.loginForm);
  }

  onSubmit() {
    console.log('onSubmit(): ',this.loginForm);
    // TEMP!
    this.auth.login('user', 'user');
    // this.loginForm.reset();
  }
}
