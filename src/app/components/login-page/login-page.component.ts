import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  error: string;
  email: string;
  password: string;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.error = '';
    if (this.api.isTokenValid()) {
      this.router.navigate(['/dashboard']);
    }
  }

  emailUpdate(email: string) {
    this.error = '';
    this.email = email;
  }

  passwordUpdate(password: string) {
    this.error = '';
    this.password = password;
  }

  async onLoginClick(event) {
    try {
      const res = await this.api.login(this.email, this.password);
      if (res && !res.statusCode) {
        await this.api.saveDataAccess(res);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.error = 'There was an error logging in.';
      }
    }
    catch (err) {
      this.error = 'There was an error logging in.';
    }
  }

  async onRegisterClick(event) {
    this.router.navigate(['/register']);
  }
}
