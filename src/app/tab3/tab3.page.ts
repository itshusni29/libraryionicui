import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/wishlists').subscribe(
      (response) => {
        this.items = response.map((item) => ({
          ...item.book,
          inWishlist: true, // Flag to indicate it's in the wishlist
        }));
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

  addToWishlist(bookId: number) {
    this.http.post('http://127.0.0.1:8000/api/wishlists', { book_id: bookId }).subscribe(
      (response) => {
        console.log('Book added to wishlist successfully:', response);
        // Update items to reflect the new wishlist status
        const item = this.items.find((item) => item.id === bookId);
        if (item) {
          item.inWishlist = true;
        }
      },
      (error) => {
        console.error('Error adding book to wishlist:', error);
      }
    );
  }

  removeFromWishlist(bookId: number) {
    this.http.delete(`http://127.0.0.1:8000/api/wishlists/${bookId}`).subscribe(
      (response) => {
        console.log('Book removed from wishlist successfully:', response);
        // Update items to reflect the new wishlist status
        const item = this.items.find((item) => item.id === bookId);
        if (item) {
          item.inWishlist = false;
        }
      },
      (error) => {
        console.error('Error removing book from wishlist:', error);
      }
    );
  }
}
