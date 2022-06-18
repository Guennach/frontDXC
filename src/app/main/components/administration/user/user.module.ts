import { AuthGuard } from './../../../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './shared/user.service';
import { RoleService } from '../role/shared/role.service';

const USER_ROUTER: Routes = [
  { path: '', component: UserListComponent,canActivate: [AuthGuard] },
  { path: 'edit', component: UserComponent,canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(USER_ROUTER),
  ],
  declarations: [UserListComponent, UserComponent],
  providers: [UserService, RoleService]
})
export class UserModule { }
