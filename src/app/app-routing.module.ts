import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'all',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule)
  },
  {
    path: 'detail-books/:id', // Menambahkan parameter 'id' di sini
    loadChildren: () => import('./book-detail/book-detail.module').then(m => m.BookDetailPagePageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfilePageModule)
  },
  // Jika Anda memiliki rute default, pastikan itu berada di bagian akhir
  {
    path: '**',
    redirectTo: 'login', // Misalnya, redirect ke halaman login jika rute tidak cocok
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
