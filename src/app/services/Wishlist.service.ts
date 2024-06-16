import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl = 'http://127.0.0.1:8000/api/wishlists';

  constructor(private http: HttpClient) {}

  getAllWishlistItems() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addToWishlist(bookId: number) {
    return this.http.post(`${this.baseUrl}`, { book_id: bookId });
  }

  removeFromWishlist(bookId: number) {
    return this.http.delete(`${this.baseUrl}/${bookId}`);
  }
}
