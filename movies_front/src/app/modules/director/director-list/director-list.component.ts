import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { DirectorService } from '../../../services/director.service';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.css'],
})
export class DirectorListComponent implements OnInit {
  @ViewChild('directorModal') directorModal: any;
  selected: boolean = false;
  selectedDirector!: DirectorDetail;
  directors: Array<DirectorDetail> = [];
  filteredDirectors: DirectorDetail[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  directorsPerPage: number = 10;
  maxDisplayedPages: number = 3;
  startPage: number = 1;
  paginationPages: number[] = [];
  @Output() directorSelectedEvent = new EventEmitter<DirectorDetail>();

  constructor(private directorService: DirectorService) {}
  onSelected(director: DirectorDetail): void {
    this.selected = true;
    this.selectedDirector = director;
    this.directorSelectedEvent.emit(director);
  }

  resetCurrentPage(): void {
    this.currentPage = 1;
    this.startPage = 1;
    this.setPaginationPages();
  }

  prevPageBlock(): void {
    if (this.startPage > 1) {
      this.startPage -= this.maxDisplayedPages;
      this.currentPage = this.startPage;
      this.setPaginationPages();
    }
  }

  nextPageBlock(): void {
    if (this.startPage + this.maxDisplayedPages - 1 < this.totalPages) {
      this.startPage += this.maxDisplayedPages;
      this.currentPage = this.startPage;
      this.setPaginationPages();
    }
  }

  setPaginationPages(): void {
    const finishPage = this.startPage + this.maxDisplayedPages - 1;
    let length: number;
    if (finishPage >= this.totalPages) {
      length = this.totalPages - this.startPage + 1;
    } else {
      length = this.maxDisplayedPages;
    }
    this.paginationPages = Array.from({ length }, (_, i) => this.startPage + i);
  }

  getDisplayedDirectors(): DirectorDetail[] {
    const startIndex = (this.currentPage - 1) * this.directorsPerPage;
    const endIndex = this.currentPage * this.directorsPerPage;
    return this.filteredDirectors.slice(startIndex, endIndex);
  }

  extractLastName = (fullName: string): string => {
    const parts = fullName.split(' ');
    return parts[1]; // assumes second string is last name
  };

  sortDirectors(directors: DirectorDetail[]): DirectorDetail[] {
    return this.getSortedDirectors(directors);
  }

  getSortedDirectors = (directors: any) => {
    return directors.sort((a: any, b: any) => {
      const aLastName = this.extractLastName(a.name);
      const bLastName = this.extractLastName(b.name);
      return aLastName.localeCompare(bLastName);
    });
  };

  getDirectors(): void {
    this.directorService.getDirectors().subscribe((directors) => {
      this.directors = this.sortDirectors(directors);
      this.filteredDirectors = this.directors;
      this.setPaginationPages();
      this.selected = true;
      this.selectedDirector = this.directors[0];
      this.directorSelectedEvent.emit(this.selectedDirector);
    });
  }

  closeModal() {
    this.directorModal.nativeElement.classList.remove('show');
    this.directorModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.getDirectors();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDirectors.length / this.directorsPerPage);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredDirectors = this.directors;
      this.resetCurrentPage();
    } else {
      this.filteredDirectors = this.directors.filter((director) =>
        director.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.resetCurrentPage();
    }
  }

  ngOnInit() {
    this.getDirectors();
  }
}
