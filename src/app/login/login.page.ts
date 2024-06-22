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
  loginError: string = '';
  loginSuccess: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe(response => {
      console.log('Login successful', response);
      this.loginSuccess = 'Login berhasil!';
      this.loginError = ''; // Bersihkan pesan error jika ada
      localStorage.setItem('token', response.token);
      // Navigasi ke halaman atau rute yang sesuai setelah login berhasil
      this.router.navigate(['/tabs']);
    }, error => {
      console.log('Login failed', error);
      this.loginError = 'Email atau password salah. Silakan coba lagi.';
      this.loginSuccess = ''; // Bersihkan pesan sukses jika ada
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
