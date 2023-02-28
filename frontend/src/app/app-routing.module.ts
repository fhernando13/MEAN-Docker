import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormsComponent } from './component/user-forms/user-forms.component';

// Components
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormsComponent },
  { path: 'users/update/:_id', component: UserFormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }