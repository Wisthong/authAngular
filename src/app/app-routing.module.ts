import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'dashboard',
    loadComponent() {
      return import('../app/dashobard/dashobard.component');
    },
    canActivate: [AuthGuard],
    title: 'Dashboard',
  },
  {
    path: 'register',
    loadComponent() {
      return import('../app/register/register.component').then(
        (m) => m.RegisterComponent
      );
    },
    title: 'Register',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
