import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../../models/IUser';
import { AlertifyService } from '../../Services/alertify.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private authService: AuthService,
              private alertifySercive: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  Login(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if(token) {
       localStorage.setItem('token', token.userName);
      this.alertifySercive.success('Login succesfully ! :)');
      this.router.navigate(['/']);
    } else {
      this.alertifySercive.error('User ID or password are incorect');
    }
  }

}
