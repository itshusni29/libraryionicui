import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { BookLoanService } from '../services/book-loan.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WishlistService } from '../services/Wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  book: any;
  userId: number | null = null;
  inWishlist: boolean = false;
  isBorrowed: boolean = false;
  borrowedItemId: number | null = null;
  isReading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private navCtrl: NavController,
    private wishlistService: WishlistService,
    private bookLoanService: BookLoanService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(
      (user: any) => {
        if (user) {
          this.userId = user.id;
        } else {
          // Jika pengguna tidak login, arahkan ke halaman login
          this.navCtrl.navigateRoot(['/login']);
        }
      },
      error => {
        console.error('Error fetching logged in user:', error);
      }
    );

    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.fetchBookDetails(bookId);

      this.inWishlist = this.isBookInLocalStorage(bookId);

      this.isBorrowed = this.isBookBorrowed(bookId);
    });
  }

  fetchBookDetails(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(response => {
      this.book = response;
    });
  }

  addToWishlist(bookId: number) {
    this.wishlistService.addToWishlist(bookId).subscribe(
      response => {
        console.log('Book added to wishlist:', response);
        this.inWishlist = true;
        this.updateLocalStorage(bookId, true);
      },
      error => {
        console.error('Error adding book to wishlist:', error);
      }
    );
  }

  removeFromWishlist(bookId: number) {
    this.wishlistService.removeFromWishlist(bookId).subscribe(
      response => {
        console.log('Book removed from wishlist:', response);
        this.inWishlist = false;
        this.updateLocalStorage(bookId, false);
      },
      error => {
        console.error('Error removing book from wishlist:', error);
      }
    );
  }

  borrowOrReturnBook() {
    if (this.userId === null) {
      console.error('User ID is null');
      return;
    }

    if (this.isBorrowed) {
      this.returnBook();
    } else {
      this.borrowBook();
    }
  }

  borrowBook() {
    this.bookLoanService.borrowBook(this.book.id).subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.isBorrowed = true;
        this.borrowedItemId = response.id;
        alert('Book borrowed successfully');
      },
      error => {
        console.error('Error borrowing book:', error);
        alert('Failed to borrow book');
      }
    );
  }

  returnBook() {
    if (!this.borrowedItemId) {
      console.error('No borrowed item ID found');
      return;
    }

    this.bookLoanService.returnBook(this.borrowedItemId).subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.isBorrowed = false;
        this.borrowedItemId = null;
        alert('Book returned successfully');
      },
      error => {
        console.error('Error returning book:', error);
        alert('Failed to return book');
      }
    );
  }

  updateLocalStorage(bookId: number, isInWishlist: boolean) {
    const storageKey = `wishlist_book_${bookId}`;
    if (isInWishlist) {
      localStorage.setItem(storageKey, 'true');
    } else {
      localStorage.removeItem(storageKey);
    }
  }

  isBookInLocalStorage(bookId: number): boolean {
    const storageKey = `wishlist_book_${bookId}`;
    return localStorage.getItem(storageKey) === 'true';
  }

  isBookBorrowed(bookId: number): boolean {
    const borrowedItems = JSON.parse(localStorage.getItem('borrowed_items') || '[]');
    return borrowedItems.some((item: any) => item.book.id === bookId && item.user.id === this.userId && item.status === 'Dipinjam');
  }

  goToPdfViewer(bookId: string) {
    if (!this.userId) {
      console.error('User ID is null');
      return;
    }
    this.navCtrl.navigateForward(['/pdf-viewer', bookId]);
  }

  goToReadingView() {
    this.isReading = true;
  }

  exitReadingView() {
    this.isReading = false;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
