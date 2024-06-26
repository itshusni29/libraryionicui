import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://kutbuk.if22g.com/api';
  private booksUrl = `${this.baseUrl}/books`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.booksUrl);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.booksUrl}/${id}`);
  }

  getNewBooks(): Observable<any[]> {
    const url = `${this.booksUrl}?new=true`;
    return this.http.get<any[]>(url);
  }

  getBooksByCategory(category: string): Observable<any[]> {
    const url = `${this.booksUrl}?category=${category}`;
    return this.http.get<any[]>(url);
  }

  searchBooks(query: string): Observable<any[]> {
    const url = `${this.booksUrl}?search=${query}`;
    return this.http.get<any[]>(url);
  }

  getTopReadBooks(): Observable<any[]> {
    const url = `${this.booksUrl}?top_read=true`;
    return this.http.get<any[]>(url);
  }

  getBookPdfUrl(bookId: string): Observable<string> {
    const url = `${this.baseUrl}/books/${bookId}/pdf`;
    return this.http.get(url, { responseType: 'text' });
  }
}
