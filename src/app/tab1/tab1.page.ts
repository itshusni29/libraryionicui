// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newBooks: any[] = [];
  userName: string = ''; // Variable to store the user's name

  constructor(private bookService: BookService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchNewBooks();
    this.getUserData();
  }

  fetchNewBooks() {
    this.bookService.getNewBooks().subscribe(response => {
      this.newBooks = response.slice(0, 6); // Limit to 6 books
    });
  }

  getUserData() {
    this.authService.getLoggedInUser().subscribe(response => {
      this.userName = response.name; // Adjust this based on the actual structure of your response
    });
  }
}
