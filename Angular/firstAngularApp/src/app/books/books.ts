import { Component } from '@angular/core';
import { TransformingPipe } from '../transforming-pipe';
@Component({
  selector: 'app-books',
  imports: [TransformingPipe],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books = [
    { name: 'The Great Gatsby', year: 2026 },
    { name: 'To Kill a Mockingbird', year: 1960 },
    { name: 'la  boite a merveille', year: 2008 },
    { name: 'Antigone', year: 2030 },
    { name: 'Deep Working ', year: 2035 },
  ];

}
