import { Injectable } from '@angular/core';
import { UserForRegister } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user) {
    let users : string[] = [];
    if(localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') || '{}');
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
