import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe(response => {
      console.log('Login successful', response);
      localStorage.setItem('token', response.token); 
      this.router.navigate(['/tabs']); 
    }, error => {
      console.log('Login failed', error);
    });
  }

  register() {
    const registerData = {
      email: this.email,
      password: this.password
    };

    this.authService.register(registerData).subscribe(response => {
      console.log('Registration successful', response);
      localStorage.setItem('token', response.token); 
      this.router.navigate(['/tabs']); 
    }, error => {
      console.log('Registration failed', error);
    });
  }
}
