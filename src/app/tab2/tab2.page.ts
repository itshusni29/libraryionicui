import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searchTerm: string = '';
  selectedCategory: string = 'All';
  bookCategories: string[] = [
    'All', 'Fiksi', 'Non-fiksi', 'Novel', 'Cerpen', 'Drama', 'Puisi', 'Biografi', 'Sejarah', 'Ilmiah', 'Teknologi',
    'Bisnis', 'Kesehatan', 'Seni', 'Musik', 'Pendidikan', 'Agama', 'Filosofi', 'Politik', 'Psikologi',
    'Hukum', 'Perjalanan', 'Kuliner', 'Olahraga', 'Alam', 'Petualangan'
  ];

  newBooks: any[] = [
    { id: 1, title: 'Pria Tangguh', author: 'Alya Wilson', imageUrl: 'assets/images/2.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang pria tangguh.', bookCategories: this.bookCategories },
    { id: 2, title: 'Kala Senja Menyapa', author: 'Hinto Ananta', imageUrl: 'assets/images/3.jpg', rating: '5.0', category: 'Fiction', description: 'Deskripsi buku tentang kala senja.', bookCategories: this.bookCategories },
    { id: 3, title: 'Kisah Cinta Remaja', author: 'Ataka Hananta', imageUrl: 'assets/images/4.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang kisah cinta remaja.', bookCategories: this.bookCategories },
    { id: 4, title: 'Cinta Sampai Ke Surya', author: 'Indah Wahyu', imageUrl: 'assets/images/5.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang cinta dan surya.', bookCategories: this.bookCategories },
    { id: 5, title: 'Tentang Cinta', author: 'Elson Nemala', imageUrl: 'assets/images/6.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang cinta.', bookCategories: this.bookCategories },
    { id: 6, title: 'Melangkah Bersama', author: 'Elson Nemala', imageUrl: 'assets/images/7.jpg', rating: '5.0', category: 'Non-Fiction', description: 'Deskripsi buku tentang melangkah bersama.', bookCategories: this.bookCategories },
    { id: 7, title: 'Kekuatan Punggung Seorang Ayah', author: 'Elson Nemala', imageUrl: 'assets/images/8.jpg', rating: '5.0', category: 'Non-Fiction', description: 'Deskripsi buku tentang kekuatan seorang ayah.', bookCategories: this.bookCategories },
    { id: 8, title: 'Kehangatan Keluarga', author: 'Elson Nemala', imageUrl: 'assets/images/9.jpg', rating: '5.0', category: 'Non-Fiction', description: 'Deskripsi buku tentang kehangatan keluarga.', bookCategories: this.bookCategories },
    { id: 9, title: 'Keramahan Kenyamanan Keluarga', author: 'Elson Nemala', imageUrl: 'assets/images/10.jpg', rating: '5.0', category: 'Non-Fiction', description: 'Deskripsi buku tentang keramahan dan kenyamanan keluarga.', bookCategories: this.bookCategories },
    { id: 10, title: 'Sebuah Keindahan', author: 'Elson Nemala', imageUrl: 'assets/images/11.jpg', rating: '5.0', category: 'Fantasy', description: 'Deskripsi buku tentang keindahan.', bookCategories: this.bookCategories },
    { id: 11, title: 'Dengan Keluarga, Kukejar Surga', author: 'Elson Nemala', imageUrl: 'assets/images/12.jpg', rating: '5.0', category: 'Fantasy', description: 'Deskripsi buku tentang perjalanan mencari surga bersama keluarga.', bookCategories: this.bookCategories },
    { id: 12, title: 'Meminangmu', author: 'Elson Nemala', imageUrl: 'assets/images/13.jpg', rating: '5.0', category: 'Fantasy', description: 'Deskripsi buku tentang meminangmu.', bookCategories: this.bookCategories },
    { id: 13, title: 'Rahasia Cinta Kita', author: 'Elson Nemala', imageUrl: 'assets/images/14.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang rahasia cinta kita.', bookCategories: this.bookCategories },
    { id: 14, title: 'Cinta Yang Mekar', author: 'Elson Nemala', imageUrl: 'assets/images/15.jpg', rating: '5.0', category: 'Romance', description: 'Deskripsi buku tentang cinta yang mekar.', bookCategories: this.bookCategories }
    // Tambahkan buku lainnya sesuai kebutuhan
  ];

  filteredBooks: any[] = [];

  constructor() {
    this.filterBooks();
  }

  filterBooks() {
    let filteredBooks = this.newBooks;

    if (this.selectedCategory !== 'All') {
      filteredBooks = this.newBooks.filter(book => book.category === this.selectedCategory);
    }

    if (this.searchTerm !== '') {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredBooks = filteredBooks;
  }
}
