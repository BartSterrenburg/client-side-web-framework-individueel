import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../../../libs/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../../../../../../libs/shared/services/auth/auth.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  subs?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((user) => {
        if (user) {
          console.log('user = ', user);
          this.router.navigate(['/']);
        }
      });
    } else {
      console.error('registerForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );
    if (!regexp.test(email)) {
      return { email: false };
    }
    return null;
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    if (!regexp.test(password)) {
      return { password: false };
    }
    return null;
  }
}

