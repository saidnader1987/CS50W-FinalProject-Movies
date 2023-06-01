import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genre } from 'src/app/models/genres';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './genre-create.component.html',
})
export class GenreCreateComponent implements OnInit {
  @Output() genreCreated: EventEmitter<void> = new EventEmitter<void>();
  genreForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.genreForm = this.formBuilder.group({
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  createGenre(genre: Genre) {
    console.log(genre);
    this.genreService.saveGenre(genre).subscribe((result) => {
      console.log('result of save', result);
      this.toastr.success('Confirmation', 'Genre created succesfully!');
      this.genreForm.reset();
      this.genreCreated.emit();
    });
  }

  cancelCreation() {
    this.genreForm.reset();
  }
}
