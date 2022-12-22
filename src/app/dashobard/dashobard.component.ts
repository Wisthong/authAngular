import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MaterialModule } from '@modules/material/material.module';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashobard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashobard.component.html',
  styleUrls: ['./dashobard.component.css'],
})
export default class DashobardComponent {
  constructor(
    private readonly authSvc: AuthService,
    private readonly router: Router
  ) {}

  get usuario() {
    return this.authSvc.usuario;
  }

  onLogout() {
    this.authSvc.logout();
    Swal.fire('Cerrar sesión', 'Has cerrado sesión', 'info');
    this.router.navigate(['/login']);
  }
}
