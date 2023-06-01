import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent implements OnInit {
  constructor(private genreService: GenreService) {}

  @ViewChild('genreModal') genreModal: any;
  genresList: Genre[] = [];
  filteredGenres: Genre[] = [];
  selected: boolean = false;
  selectedGenre!: Genre;
  @Output() genreSelectedEvent = new EventEmitter<Genre>();
  searchTerm: string = '';

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe((result) => {
      this.genresList = result as Genre[];
      this.onSearch();
      this.selectedGenre = this.genresList[0];
      this.genreSelectedEvent.emit(this.genresList[0]);
    });
  }

  onSelected(genre: Genre): void {
    this.selected = true;
    this.selectedGenre = genre;
    this.genreSelectedEvent.emit(genre);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredGenres = this.genresList;
    } else {
      this.filteredGenres = this.genresList.filter((genre) =>
        genre.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  closeModal() {
    this.genreModal.nativeElement.classList.remove('show');
    this.genreModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.getGenres();
  }
}
