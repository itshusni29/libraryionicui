import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BookService } from '../services/book.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/Wishlist.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  book: any;
  userId: number | null = null;
  inWishlist: boolean = false; // Variabel untuk menyimpan status wishlist

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private http: HttpClient,
    private authService: AuthService,
    private navCtrl: NavController,
    private wishlistService: WishlistService
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

      // Memeriksa apakah buku sudah ada di wishlist saat komponen dimuat
      this.wishlistService.getAllWishlistItems().subscribe((wishlistItems: any[]) => {
        const isInWishlist = wishlistItems.some(item => item.book.id === bookId);
        this.inWishlist = isInWishlist;
      });
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
        this.inWishlist = true; // Set inWishlist ke true setelah berhasil ditambahkan
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
        this.inWishlist = false; // Set inWishlist ke false setelah berhasil dihapus
      },
      error => {
        console.error('Error removing book from wishlist:', error);
      }
    );
  }

  borrowBook() {
    if (this.userId === null) {
      console.error('User ID is null');
      return;
    }

    this.authService.getLoggedInUser().subscribe(
      (user: any) => {
        const token = user.token;
        if (token) {
          const apiUrl = `http://127.0.0.1:8000/api/borrow/${this.book.id}`;
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });

          this.http.post(apiUrl, { userId: this.userId }, { headers }).subscribe(
            (response: any) => {
              console.log('Response:', response);
              alert('Book borrowed successfully');
              this.navCtrl.back(); // Navigasi kembali setelah meminjam buku
            },
            error => {
              console.error('Error borrowing book:', error);
              alert('Failed to borrow book');
            }
          );
        }
      },
      error => {
        console.error('Error fetching logged in user:', error);
      }
    );
  }
}
