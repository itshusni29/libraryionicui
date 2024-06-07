import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookDetailPage } from './book-detail.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BookDetailPageRoutingModule } from './book-detail-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BookDetailPageRoutingModule
  ],
  declarations: [BookDetailPage]
})
export class BookDetailPagePageModule {}
