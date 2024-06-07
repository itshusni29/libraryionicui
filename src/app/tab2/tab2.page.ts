import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  newBooks: any[] = [
    { title: 'Pria Tangguh', author: 'Alya Wilson', imageUrl: 'assets/images/2.jpg', rating: '5.0' },
    { title: 'Kala Senja Menyapa', author: 'Hinto Ananta', imageUrl: 'assets/images/3.jpg', rating: '5.0' },
    { title: 'Kisah Cinta Remaja', author: 'Ataka hananta', imageUrl: 'assets/images/4.jpg', rating: '5.0' },
    { title: 'Cinta Sampai Ke Surya', author: 'Indah wahyu', imageUrl: 'assets/images/5.jpg', rating: '5.0'},
    { title: 'Tentang Cinta', author: 'Elson nemala', imageUrl: 'assets/images/6.jpg', rating: '5.0' },
    { title: 'Melangkah Bersama', author: 'Elson nemala', imageUrl: 'assets/images/7.jpg', rating: '5.0' },
    { title: 'Kekuatan Punggung Seorang Ayah', author: 'Elson nemala', imageUrl: 'assets/images/8.jpg', rating: '5.0' },
    { title: 'Kehangatan Keluarga', author: 'Elson nemala', imageUrl: 'assets/images/9.jpg', rating: '5.0' },
    { title: 'Keramahan Kenyamanan Keluarga', author: 'Elson nemala', imageUrl: 'assets/images/10.jpg', rating: '5.0' },
    { title: 'Sebuah Keindahan', author: 'Elson nemala', imageUrl: 'assets/images/11.jpg', rating: '5.0' },
    { title: 'Dengan Keluarga, Kukejar Surga', author: 'Elson nemala', imageUrl: 'assets/images/12.jpg', rating: '5.0' },
    { title: 'Meminangmu', author: 'Elson nemala', imageUrl: 'assets/images/13.jpg', rating: '5.0' },
    { title: 'Rahasia Cinta Kita', author: 'Elson nemala', imageUrl: 'assets/images/14.jpg', rating: '5.0' },
    { title: 'Cinta Yang Mekar', author: 'Elson nemala', imageUrl: 'assets/images/15.jpg', rating: '5.0' },
  ];
  constructor() {}

}
