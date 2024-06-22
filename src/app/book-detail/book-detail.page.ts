import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BookService } from '../services/book.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { BookLoanService } from '../services/book-loan.service';
import { WishlistService } from '../services/Wishlist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  borrowedItemId: number | null = null; // ID pinjaman buku jika sedang dipinjam
  isReading: boolean = false; // Flag to toggle between views

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private http: HttpClient,
    private authService: AuthService,
    private navCtrl: NavController,
    private wishlistService: WishlistService,
    private bookLoanService: BookLoanService,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {}

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(
      (user: any) => {
        this.userId = user.id;
      },
      error => {
        console.error('Error fetching logged in user:', error);
      }
    );

    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.fetchBookDetails(bookId);

      // Check if the book is in the wishlist (from localStorage)
      this.inWishlist = this.isBookInLocalStorage(bookId);

      // Check if the book is borrowed by the user and not returned
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
        this.updateLocalStorage(bookId, true); // Update localStorage
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
        this.updateLocalStorage(bookId, false); // Update localStorage
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
      // Already borrowed, return the book
      this.returnBook();
    } else {
      // Not borrowed, borrow the book
      this.borrowBook();
    }
  }

  borrowBook() {
    this.bookLoanService.borrowBook(this.book.id).subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.isBorrowed = true;
        this.borrowedItemId = response.id; // Simpan ID pinjaman buku yang baru
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

  // Helper functions to manage localStorage
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

  // Navigasi ke halaman penampil PDF
  goToPdfViewer(pdfUrl: string) {
    this.navCtrl.navigateForward(['/pdf-viewer', encodeURIComponent(pdfUrl)]);
  }

  // Method untuk membuka Google Drive link
  goToGoogleDrive() {
    const googleDriveUrl = 'https://docs.google.com/document/d/13S1u8wDX6MrzH3jB1dTNUHIcQzfU542v-5r50lOmcXw/edit?usp=sharing';
    window.open(googleDriveUrl, '_blank'); // Buka link di tab atau window baru
  }

  // Method untuk toggle tampilan baca
  goToReadingView() {
    this.isReading = true;
  }

  // Method untuk keluar dari tampilan baca
  exitReadingView() {
    this.isReading = false;
  }

  // Method untuk membersihkan URL
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
