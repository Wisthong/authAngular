import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material/material.module';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group({
    lastname: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    private readonly router: Router
  ) {}

  onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.getRawValue();
      this.authSvc.register(user).subscribe(
        (resOk) => {
          Swal.fire('Registro de Usuario', resOk, 'success');
          this.router.navigate(['/dashboard']);
        },
        ({ error }: HttpErrorResponse) => {
          Swal.fire('Registro de usuario', error.message, 'error');
        }
      );
    } else {
      Swal.fire('Advertencia', 'Faltan campos por llenar', 'warning');
    }
  }
}
