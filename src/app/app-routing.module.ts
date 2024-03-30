import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  { path: 'Userdetails/:id', component: UserDetailsComponent },
  { path: "", redirectTo: "/user-list", pathMatch: "full" },
  { path: "**", redirectTo: "/user-list", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
