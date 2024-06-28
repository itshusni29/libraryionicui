import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookLoanService {
  private baseUrl = 'https://kutbuk.if22g.com/api';

  constructor(private http: HttpClient) { }

  borrowBook(bookId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/borrow/${bookId}`, {});
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/return/${loanId}`, {});
  }

  getAllBorrowItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/borrowed-books/user`);
  }
}
