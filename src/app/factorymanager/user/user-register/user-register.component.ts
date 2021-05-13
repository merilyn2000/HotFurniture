import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForRegister } from '../../models/IUser';
import { AlertifyService } from '../../Services/alertify.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  user!: UserForRegister;
  userSubmited!: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registrationForm = this.fb.group({
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password')!.value === fg.get('confirmPassword')!.value
       ? null : {'mismatch': true};
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
      return this.registrationForm.get('email') as FormControl;
  }
  get password() {
      return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
      return this.registrationForm.get('confirmPassword') as FormControl;
  }

  userData() {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value
    }
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmited = true;

    if(this.registrationForm.valid) {
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmited = false;
      this.alertifyService.success("You are successfully registered ! :)");
    } else {
      this.alertifyService.error("Please provide the required fields !");
    }
  }



}
