import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.css'],
})
export class PopularityComponent implements OnInit, OnChanges {
  faStar = faStar;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  @Input() popularity?: number = 2;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.popularity && changes.popularity.currentValue) {
      this.selectedValue = this.popularity == undefined ? 0 : this.popularity;
    }
  }

  ngOnInit(): void {
    this.selectedValue = this.popularity == undefined ? 0 : this.popularity;
  }
}
