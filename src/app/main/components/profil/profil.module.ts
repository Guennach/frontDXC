import { AuthGuard } from './../../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/modules/shared.module';
import {ProfilComponent} from './profil.component';

const PROFIL_ROUTER: Routes = [
  { path: '', component: ProfilComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(PROFIL_ROUTER)
  ],
  declarations: [ProfilComponent]
})
export class ProfilModule { }
