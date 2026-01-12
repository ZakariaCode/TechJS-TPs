import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-api',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './books-api.html',
  styleUrl: './books-api.css',
})
export class BooksApi implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;
  isEditMode = false;
  editingId: number | null = null;
  showForm = false;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadBooks();
    
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.editingId = +params['id'];
        this.showForm = true;
        this.loadBookForEdit(this.editingId);
      }
    });

    // Check if we're in create mode
    this.route.url.subscribe(url => {
      if (url.length > 1 && url[1].path === 'create') {
        this.showForm = true;
        this.isEditMode = false;
      }
    });
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]]
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Error loading books:', err)
    });
  }

  loadBookForEdit(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue(book);
      },
      error: (err) => console.error('Error loading book:', err)
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const bookData: Book = this.bookForm.value;

    if (this.isEditMode && this.editingId) {
      this.bookService.updateBook(this.editingId, bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.resetForm();
          this.router.navigate(['/books-api']);
        },
        error: (err) => console.error('Error updating book:', err)
      });
    } else {
      this.bookService.createBook(bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.resetForm();
          this.router.navigate(['/books-api']);
        },
        error: (err) => console.error('Error creating book:', err)
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Error deleting book:', err)
      });
    }
  }

  editBook(id: number): void {
    this.router.navigate(['/books-api/edit', id]);
  }

  showCreateForm(): void {
    this.router.navigate(['/books-api/create']);
  }

  cancelForm(): void {
    this.resetForm();
    this.router.navigate(['/books-api']);
  }

  resetForm(): void {
    this.bookForm.reset();
    this.isEditMode = false;
    this.editingId = null;
    this.showForm = false;
  }
}
