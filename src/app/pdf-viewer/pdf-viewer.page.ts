import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  pdfSrc: SafeResourceUrl = '';
  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      console.log('Book ID:', bookId);
      if (bookId) {
        this.bookService.getBookById(bookId).subscribe(
          (book: any) => {
            console.log('Book data:', book);
            // Periksa apakah book.artikel sudah berisi URL lengkap atau path relatif
            const pdfUrl = book.artikel.startsWith('http')
              ? book.artikel
              : `http://127.0.0.1:8000/storage/${book.artikel}`;
            console.log('PDF URL:', pdfUrl);
            this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
            this.setIframeHeight();
          },
          (error: any) => {
            console.error('Error fetching book details:', error);
          }
        );
      }
    });
  }

  setIframeHeight() {
    const windowHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
    console.log('Window Height:', windowHeight);
    this.pdfViewer.nativeElement.style.height = `${windowHeight}px`;
  }
}





/*import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  pdfSrc: SafeResourceUrl = ''; // Initialize pdfSrc with a safe value
  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) {}

  ngOnInit() {
    // Replace with your static PDF URL
    const pdfUrl = 'http://127.0.0.1:8000/storage/artikels/1719417864.pdf';
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

    // Set iframe height to match device height
    this.setIframeHeight();
  }

  setIframeHeight() {
    const windowHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
    this.pdfViewer.nativeElement.style.height = `${windowHeight}px`;
  }
}
*/