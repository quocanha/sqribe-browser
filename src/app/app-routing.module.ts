import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: '', component: DashboardComponent,
      // },
      // {
      //   path: "schedule", component: ScheduleComponent,
      // },
      // {
      //   path: "shifts", component: ShiftsComponent,
      // },
      // {
      //   path: "history", component: HistoryComponent,
      // },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
