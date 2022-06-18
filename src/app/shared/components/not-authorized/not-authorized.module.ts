import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedComponent } from './not-authorized.component';
import { FormsModule } from '@angular/forms';


const LOGIN_ROUTER: Routes = [
  {
    path: '',
    component: NotAuthorizedComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(LOGIN_ROUTER),
  ],
  declarations: [NotAuthorizedComponent]
})
export class NotAuthorizedModule { }
