import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  user: any = {};
  safePhotoUrl: SafeUrl | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserData().subscribe(
      (data: any) => {
        this.user = data;
        if (this.user.photo_profile) {
          this.safePhotoUrl = this.sanitizer.bypassSecurityTrustUrl(`http://127.0.0.1:8000/storage/${this.user.photo_profile}`);
        } else {
          this.safePhotoUrl = undefined; // Atau berikan nilai default lainnya jika perlu
        }
      },
      (error: any) => {
        console.error('Error fetching user data', error);
        // Handle error securely, avoid exposing sensitive information
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Logout failed', error);
        localStorage.removeItem('token'); // Hapus token meskipun logout gagal
        this.router.navigate(['/login']);
      }
    );
  }
}