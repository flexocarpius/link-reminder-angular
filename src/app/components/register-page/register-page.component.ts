import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmValidation } from './confirm-validation';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
    [ConfirmValidation.ConfirmValidation('password', 'passwordConfirmation')]
  );

  constructor(public router: Router, private api: ApiService) {}

  ngOnInit(): void {}

  onBackClick(event) {
    this.router.navigate(['/login']);
  }

  async onRegisterClick(event) {
    if (this.signUpForm.valid) {
      const result = await this.api.register(
        this.signUpForm.controls.email.value,
        this.signUpForm.controls.password.value
      );
      if (result !== undefined) {
        this.api.saveDataAccess(result);
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
