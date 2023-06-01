import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActorService } from 'src/app/services/actor.service';
import { CountryService } from 'src/app/services/country.service';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css'],
})
export class ActorCreateComponent implements OnInit {
  actorForm!: FormGroup;
  countries: string[] = [];
  @Output() actorCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private countryService: CountryService,
    private actorService: ActorService
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

  createActor(actor: Actor) {
    this.actorService.createActor(actor).subscribe((response) => {
      console.info('The actor was created: ', response);
      this.toastr.success('Confirmation', 'Actor created');
      this.actorForm.reset();
      this.actorCreated.emit();
    });
  }

  cancelCreation() {
    this.actorForm.reset();
  }

  ngOnInit() {
    this.getCountries();
    this.actorForm = this.formBuilder.group({
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
