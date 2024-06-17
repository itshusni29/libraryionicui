import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  bookCategories: string[] = ['Fiksi', 'Non-fiksi', 'Novel', 'Cerpen', 'Drama', 'Puisi', 'Biografi', 'Sejarah', 'Ilmiah', 'Teknologi', 'Bisnis', 'Kesehatan', 'Seni', 'Musik', 'Pendidikan', 'Agama', 'Filosofi', 'Politik', 'Psikologi', 'Hukum', 'Perjalanan', 'Kuliner', 'Olahraga', 'Alam', 'Petualangan'];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      response => {
        this.books = response;
        this.filteredBooks = response;
      },
      error => {
        console.error('Error fetching books:', error);
      }
    );
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(book => {
      return this.filterBySearchTerm(book) && this.filterByCategory(book);
    });
  }

  filterBySearchTerm(book: any): boolean {
    if (!this.searchTerm) {
      return true;
    }
    const term = this.searchTerm.toLowerCase();
    return (
      book.judul.toLowerCase().includes(term) ||
      book.pengarang.toLowerCase().includes(term) ||
      book.deskripsi.toLowerCase().includes(term)
    );
  }

  filterByCategory(book: any): boolean {
    if (this.selectedCategory === 'All') {
      return true;
    }
    return book.kategori === this.selectedCategory;
  }

  getStarArray(ratings: number): string[] {
    const totalStars = 5;
    const fullStars = Math.floor(ratings);
    const halfStar = ratings % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStar).fill('star-half'),
      ...Array(emptyStars).fill('star-outline')
    ];
  }
}
