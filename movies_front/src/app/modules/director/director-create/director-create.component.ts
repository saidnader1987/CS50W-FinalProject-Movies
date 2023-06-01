import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DirectorService } from 'src/app/services/director.service';
import { CountryService } from 'src/app/services/country.service';
import { Director } from 'src/app/models/director';

@Component({
  selector: 'app-director-create',
  templateUrl: './director-create.component.html',
  styleUrls: ['./director-create.component.css'],
})
export class DirectorCreateComponent implements OnInit {
  directorForm!: FormGroup;
  countries: string[] = [];
  @Output() directorCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private countryService: CountryService,
    private directorService: DirectorService
  ) {}

  countryValidator(
    control: FormControl
  ): { [validation: string]: boolean } | null {
    if (!this.countries.includes(control.value)) {
      return { invalidCountry: true };
    }
    return null;
  }

  dateValidator(
    control: FormControl
  ): { [validation: string]: boolean } | null {
    const birthDate = new Date(control.value);
    if (isNaN(birthDate.getTime())) return { invalidDate: true };

    const today = new Date();
    if (birthDate >= today) {
      return { futureDate: true };
    }
    return null;
  }

  getCountries() {
    this.countries = this.countryService.getCountries();
  }

  createDirector(director: Director) {
    this.directorService.createDirector(director).subscribe((response) => {
      console.info('The director was created: ', response);
      this.toastr.success('Confirmation', 'Director created');
      this.directorForm.reset();
      this.directorCreated.emit();
    });
  }

  cancelCreation() {
    this.directorForm.reset();
  }

  ngOnInit() {
    this.getCountries();
    this.directorForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      photo: ['', [Validators.required, Validators.pattern('https?://.+')]],
      nationality: [
        '',
        [Validators.required, this.countryValidator.bind(this)],
      ],
      birthDate: ['', [Validators.required, this.dateValidator]],
      biography: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(500),
        ],
      ],
    });
  }
}
