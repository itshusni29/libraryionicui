import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  alamat: string = '';
  nomor_telpon: string = '';
  jenis_kelamin: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      alamat: this.alamat,
      nomor_telpon: this.nomor_telpon,
      jenis_kelamin: this.jenis_kelamin
    };

    this.authService.register(userData).subscribe(response => {
      console.log('Registration successful', response);
      localStorage.setItem('token', response.token); 
      this.router.navigate(['/tabs']);  // Navigate to the tabs page or wherever you want to go after registration
    }, error => {
      console.error('Registration failed', error);
      // Handle registration error, e.g., show error message
    });
  }
}
