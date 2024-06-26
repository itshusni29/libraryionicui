import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { SafeUrlPipe } from 'src/safe-url.pipe';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
  providers: [SafeUrlPipe] // Provide SafeUrlPipe here
})
export class PdfViewerPage implements OnInit {
  pdfSrc: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private safeUrlPipe: SafeUrlPipe // Inject SafeUrlPipe here
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadPdf(bookId);
    }
  }

  loadPdf(bookId: string) {
    this.bookService.getBookPdf(bookId).subscribe(response => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.safeUrlPipe.transform(fileURL); // Use SafeUrlPipe to sanitize URL
    });
  }
}
