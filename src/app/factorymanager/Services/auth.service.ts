import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any) {
    let users : any[] = [];
    if(localStorage.getItem('Users')) {
    users = JSON.parse(localStorage.getItem('Users') || '{}');
    }
    return users.find(u => u.userName === user.userName && u.password === user.password)
  }
}
