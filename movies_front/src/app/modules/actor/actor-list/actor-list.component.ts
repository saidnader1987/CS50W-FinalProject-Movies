import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { ActorDetail } from 'src/app/models/actorDetail';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit {
  @ViewChild('actorModal') actorModal: any;
  selected: boolean = false;
  @Input() selectedActor!: ActorDetail;
  actors: Array<ActorDetail> = [];
  filteredActors: ActorDetail[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  actorsPerPage: number = 10;
  maxDisplayedPages: number = 3;
  startPage: number = 1;
  paginationPages: number[] = [];
  @Output() actorSelectedEvent = new EventEmitter<ActorDetail>();

  constructor(private actorService: ActorService) {}
  onSelected(actor: ActorDetail): void {
    this.selected = true;
    this.selectedActor = actor;
    this.actorSelectedEvent.emit(actor);
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

  getDisplayedActors(): ActorDetail[] {
    const startIndex = (this.currentPage - 1) * this.actorsPerPage;
    const endIndex = this.currentPage * this.actorsPerPage;
    return this.filteredActors.slice(startIndex, endIndex);
  }

  extractLastName = (fullName: string): string => {
    const parts = fullName.split(' ');
    return parts[1]; // assumes second string is last name
  };

  sortActors(actors: ActorDetail[]): ActorDetail[] {
    return this.getSortedActors(actors);
  }

  getSortedActors = (actors: any) => {
    return actors.sort((a: any, b: any) => {
      const aLastName = this.extractLastName(a.name);
      const bLastName = this.extractLastName(b.name);
      return aLastName.localeCompare(bLastName);
    });
  };

  getActors(): void {
    this.actorService.getActors().subscribe({
      next: (actors) => {
        console.log('💥💥💥💥💥💥💥💥');
        this.actors = this.sortActors(actors);
        this.filteredActors = this.actors;
        this.setPaginationPages();
        this.selected = true;
        this.selectedActor = this.actors[0];
        this.actorSelectedEvent.emit(this.selectedActor);
      },
      error: (e) => console.log('💥💥💥💥💥💥💥💥', e),
    });
  }

  closeModal() {
    this.actorModal.nativeElement.classList.remove('show');
    this.actorModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.getActors();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredActors.length / this.actorsPerPage);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredActors = this.actors;
      this.resetCurrentPage();
    } else {
      this.filteredActors = this.actors.filter((actor) =>
        actor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.resetCurrentPage();
    }
  }

  ngOnInit() {
    this.getActors();
  }
}
