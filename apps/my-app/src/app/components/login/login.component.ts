import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../../../libs/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserInfo } from './../../../../../../libs/shared/services/user/user.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../../../../libs/shared/services/auth/auth.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  subs?: Subscription;
  submitted = false;
  errorMessage: string | null = null; // Voeg een veld toe voor foutmeldingen

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });

    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: IUserInfo | null) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    this.errorMessage = null; // Reset foutmelding bij nieuwe poging
    if (this.loginForm?.valid && this.loginForm != undefined) {
      this.submitted = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService
        .login(email, password)
        .subscribe(
          (user) => {
            if (user) {
              console.log('Logged in');
              this.router.navigate(['/']);
            }
            this.submitted = false;
          },
          (error) => {
            // Foutafhandeling
            console.error('Login error:', error);
            this.errorMessage = 'Invalid email or password'; // Standaard foutbericht
            this.submitted = false;
          }
        );
    } else {
      this.submitted = false;
      console.error('loginForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }
}
