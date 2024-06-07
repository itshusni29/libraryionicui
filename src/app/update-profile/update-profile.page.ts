import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: 'update-profile.page.html',
  styleUrls: ['update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  userData: any = {
    name: '',
    email: '',
    nomor_telpon: '',
    alamat: '',
    address: '',
    jenis_kelamin: '',
    password: '',
    id: 0 // Add an ID field to store the user ID
  };
  rePassword: string = '';
  originalPassword: string = ''; // Store the original password here

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Fetch logged-in user data when the component initializes
    this.authService.getLoggedInUser().subscribe(
      (userData: any) => {
        this.userData = userData;
        this.originalPassword = userData.password; // Store the original password
      },
      (error: any) => {
        console.error('Error fetching user data', error);
        // Handle error response
      }
    );
  }

  updateProfile() {
    // Check if the password field is empty or not changed
    if (!this.userData.password || this.userData.password === this.originalPassword) {
      // If not changed, set the password to the original one
      this.userData.password = this.originalPassword;
    } else {
      // If changed, check if the new password matches the re-entered password
      if (this.userData.password !== this.rePassword) {
        // Handle password mismatch
        console.error('Password mismatch');
        return;
      }
    }

    // Send updated user data to the API
    this.userService.updateUserData(this.userData.id, this.userData).subscribe(
      (response: any) => {
        console.log('Profile updated successfully', response);
        // Redirect to profile page or any other page after successful update
        this.router.navigate(['/tabs/tab4']);
      },
      (error: any) => {
        console.error('Error updating profile', error);
        // Handle error response
      }
    );
  }
}
