import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Base URL for API
  private booksUrl = `${this.baseUrl}/books`; // URL for books endpoint

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

  getPdfUrl(bookId: string): string {
    return `${this.booksUrl}/${bookId}/pdf`;
  }

  getBookPdf(bookId: string): Observable<Blob> {
    const pdfUrl = this.getPdfUrl(bookId);
    return this.http.get(pdfUrl, { responseType: 'blob' });
  }
}
