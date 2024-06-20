import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookLoanService } from '../services/book-loan.service';
import { WishlistService } from '../services/Wishlist.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  wishlistItems: any[] = [];
  borrowedBooks: any[] = [];
  showWishlist = false; // Variable to control the display of Wishlist
  showBorrowedBooks = false; // Variable to control the display of My Books

  constructor(
    private http: HttpClient,
    private wishlistService: WishlistService,
    private bookLoanService: BookLoanService
  ) {}

  ngOnInit() {
    this.loadWishlist();
    this.loadBorrowedBooks();
  }

  loadWishlist() {
    this.wishlistService.getAllWishlistItems().subscribe(
      (response) => {
        this.wishlistItems = response.map((item) => ({
          ...item.book,
          inWishlist: true,
        }));
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

  loadBorrowedBooks() {
    this.bookLoanService.getAllBorrowItems().subscribe(
      (response) => {
        this.borrowedBooks = response.map((item) => ({
          ...item.book,
          loanId: item.id  // Ensure loanId is included
        }));
      },
      (error) => {
        console.error('Error fetching borrowed books:', error);
      }
    );
  }

  toggleViewWishlist() {
    this.showWishlist = true;
    this.showBorrowedBooks = false;
  }

  toggleViewBorrowedBooks() {
    this.showBorrowedBooks = true;
    this.showWishlist = false;
  }

  removeFromWishlist(bookId: number) {
    this.wishlistService.removeFromWishlist(bookId).subscribe(
      (response) => {
        console.log('Book removed from wishlist successfully:', response);
        // Update items to reflect the new wishlist status
        const item = this.wishlistItems.find((item) => item.id === bookId);
        if (item) {
          item.inWishlist = false;
        }
      },
      (error) => {
        console.error('Error removing book from wishlist:', error);
      }
    );
  }

  addToWishlist(bookId: number) {
    this.wishlistService.addToWishlist(bookId).subscribe(
      (response) => {
        console.log('Book added to wishlist successfully:', response);
        // Update items to reflect the new wishlist status
        const item = this.wishlistItems.find((item) => item.id === bookId);
        if (item) {
          item.inWishlist = true;
        }
      },
      (error) => {
        console.error('Error adding book to wishlist:', error);
      }
    );
  }

  returnBook(loanId: number) {
    this.bookLoanService.returnBook(loanId).subscribe(
      (response) => {
        console.log('Book returned successfully:', response);
        // Remove the returned book from the borrowedBooks array
        this.borrowedBooks = this.borrowedBooks.filter(book => book.loanId !== loanId);
      },
      (error) => {
        console.error('Error returning book:', error);
      }
    );
  }

  getBookCoverUrl(item: any): string {
    if (item && item.cover) {
      return 'http://127.0.0.1:8000/storage/' + item.cover;
    }
    return 'assets/default-cover.jpg';
  }
}
