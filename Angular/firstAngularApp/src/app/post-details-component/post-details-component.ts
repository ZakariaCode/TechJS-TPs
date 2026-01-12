import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-details-component',
  imports: [],
  templateUrl: './post-details-component.html',
  styleUrl: './post-details-component.css',
})
export class PostDetailsComponent {
  private router = inject(Router);

  posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1', author: 'Author 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2', author: 'Author 2' },
  ];

  goToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }
}
