import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookLoanService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Base URL for the Laravel API

  constructor(private http: HttpClient) {}

  borrowBook(bookId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrow/${bookId}`, {});
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/return/${loanId}`, {});
  }

  getAllBorrowItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/borrowed-books`);
  }
}
