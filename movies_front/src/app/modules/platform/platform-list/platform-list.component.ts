import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from 'src/app/models/platform';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css'],
})
export class PlatformListComponent implements OnInit {
  constructor(private platformService: PlatformService) {}

  @ViewChild('platformModal') platformModal: any;
  platformList: Platform[] = [];
  filteredPlatform: Platform[] = [];
  selected: boolean = false;
  selectedPlatform!: Platform;
  @Output() platformSelectedEvent = new EventEmitter<Platform>();
  searchTerm: string = '';

  ngOnInit(): void {
    this.getPlatforms();
  }

  getPlatforms() {
    this.platformService.getPlatforms().subscribe((result) => {
      this.platformList = result as Platform[];
      this.onSearch();
      this.selectedPlatform = this.platformList[0];
      this.platformSelectedEvent.emit(this.platformList[0]);
    });
  }

  onSelected(platform: Platform): void {
    this.selected = true;
    this.selectedPlatform = platform;
    this.platformSelectedEvent.emit(platform);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPlatform = this.platformList;
    } else {
      this.filteredPlatform = this.platformList.filter((platform) =>
        platform.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  closeModal() {
    this.platformModal.nativeElement.classList.remove('show');
    this.platformModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.getPlatforms();
  }
}
