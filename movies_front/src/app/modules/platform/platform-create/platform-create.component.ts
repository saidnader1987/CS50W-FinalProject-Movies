import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Platform } from 'src/app/models/platform';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-create-platform',
  templateUrl: './platform-create.component.html',
})
export class PlatformCreateComponent implements OnInit {
  @Output() platformCreated: EventEmitter<void> = new EventEmitter<void>();
  platformForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private platformService: PlatformService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.platformForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      url: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('https?://.+'),
        ],
      ],
    });
  }

  createGenre(platform: Platform) {
    console.log(platform);
    this.platformService.savePlaform(platform).subscribe((result) => {
      console.log('result of save', result);
      this.toastr.success('Confirmation', 'Platform created succesfully!');
      this.platformForm.reset();
      this.platformCreated.emit();
    });
  }

  cancelCreation() {
    this.platformForm.reset();
  }
}
