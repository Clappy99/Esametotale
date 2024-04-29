import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/book.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
  model: Book = {
    author:"",
    category:"",
    title:"",
    description:"",
  };

  id: number | undefined = undefined;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

  }


  get(id: number) {
    this.apiService.GetBook(id).subscribe({
      next: (response: Book) => {
        this.model = response;
      },
      error: (error) => console.error(error),
    });
  }

  save() {
    if (!this.id)
      this.apiService
        .CreateBook(this.model)
        .subscribe({ complete: () => this.router.navigateByUrl('/books') });
    else this.apiService.UpdateBook(this.model).subscribe();
  }
}
