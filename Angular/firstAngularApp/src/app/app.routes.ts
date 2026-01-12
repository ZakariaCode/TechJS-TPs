import { Routes } from '@angular/router';
import { Counter } from './counter/counter';
import { Books } from './books/books';
import { App } from './app';
import { PostsComponent } from './posts-component/posts-component';
import { PostDetailsComponent } from './post-details-component/post-details-component';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { form } from './form/form';
import { BooksApi } from './books-api/books-api';

export const routes: Routes = [
   {
    path: '',
    component: App
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent
  },

  {
    path: 'counter',
    component: Counter
  },
  {
    path:'books',
    component:Books
  },
  {
    path:'form',
    component: form
  },
  {
    path: 'books-api',
    component: BooksApi
  },
  {
    path: 'books-api/create',
    component: BooksApi
  },
  {
    path: 'books-api/edit/:id',
    component: BooksApi
  },
   {
    path: '**',
    component: NotFoundComponent
  }
];
