import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksApi } from './books-api';

describe('BooksApi', () => {
  let component: BooksApi;
  let fixture: ComponentFixture<BooksApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
