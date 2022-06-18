import { AuthGuard } from './../../../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './shared/role.service';
import { AccesService } from '../acces/shared/acces.service';

const ROLE_ROUTER: Routes = [
  { path: '', component: RoleListComponent,canActivate: [AuthGuard] },
  { path: 'edit', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: RoleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROLE_ROUTER),
  ],
  declarations: [RoleListComponent, RoleComponent],
  providers: [RoleService, AccesService]
})
export class RoleModule { }
