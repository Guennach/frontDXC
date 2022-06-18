import { AuthGuard } from './../../../core/guards/auth.guard';
import { NgModule , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/modules/shared.module';
import {HomeComponent} from './home.component';

const HOME_ROUTER: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(HOME_ROUTER)
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
