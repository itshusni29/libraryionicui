import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksPage } from './books.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BooksPageRoutingModule } from './books-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BooksPageRoutingModule
  ],
  declarations: [BooksPage]
})
export class BooksPageModule {}
