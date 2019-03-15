import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {RootComponent} from "./components/root/root.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthGuard],
    children: []
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
