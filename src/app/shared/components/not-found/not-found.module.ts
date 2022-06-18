import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { FormsModule } from '@angular/forms';


const LOGIN_ROUTER: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(LOGIN_ROUTER),
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
