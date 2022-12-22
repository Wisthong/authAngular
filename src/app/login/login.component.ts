import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material/material.module';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.authSvc.verifyToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.authSvc.login(email, password).subscribe(
        (resOk) => {
          Swal.fire('Login', resOk, 'success');
          this.router.navigate(['/dashboard']);
        },
        ({ error }: HttpErrorResponse) => {
          Swal.fire('Login', error.message, 'error');
        }
      );
    } else {
      Swal.fire('Advertencia', 'Faltan campos por llenar', 'warning');
    }
  }
}
