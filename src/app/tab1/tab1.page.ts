import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newBooks: any[] = [];
  userName: string = ''; // Variable to store the user's name
  baseUrl: string = 'http://127.0.0.1:8000/storage/'; // Base URL for images

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.fetchNewBooks();
    this.getUserData();
  }

  fetchNewBooks() {
    this.bookService.getNewBooks().subscribe(response => {
      this.newBooks = response.map(book => {
        // Add base URL to cover URL
        book.cover = this.baseUrl + book.cover;
        return book;
      }).slice(0, 6); // Limit to 6 books
    });
  }

  getUserData() {
    this.authService.getLoggedInUser().subscribe(response => {
      this.userName = response.name; // Adjust this based on the actual structure of your response
    });
  }

  // Function to navigate to book detail page
  goToBookDetail(bookId: string) {
    this.router.navigate(['/detail-books', bookId]);
  }
}
