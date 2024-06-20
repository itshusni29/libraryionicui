// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newBooks: any[] = [];
  topReadBooks: any[] = []; // New array to hold top read books
  userName: string = '';

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchNewBooks();
    this.fetchTopReadBooks(); // Call the function to fetch top read books
    this.getUserData();
  }

  fetchNewBooks() {
    this.bookService.getNewBooks().subscribe(
      (response: any[]) => {
        this.newBooks = response.map(book => {
          book.cover = book.cover; // Make sure the image URL is correctly set
          return book;
        }).slice(0, 6); // Limit to 6 books
      },
      error => {
        console.error('Error fetching new books:', error);
      }
    );
  }

  fetchTopReadBooks() {
    this.bookService.getTopReadBooks().subscribe(
      (response: any[]) => {
        this.topReadBooks = response.map(book => {
          book.cover = book.cover; // Make sure the image URL is correctly set
          return book;
        }).slice(0, 3); // Limit to 3 top read books
      },
      error => {
        console.error('Error fetching top read books:', error);
      }
    );
  }

  getUserData() {
    this.authService.getLoggedInUser().subscribe(
      (response: any) => {
        this.userName = response.name; // Adjust according to your actual response structure
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  goToBookDetail(bookId: string) {
    this.router.navigate(['/detail-books', bookId]);
  }
}
