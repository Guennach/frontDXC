import { AuthGuard } from './../../../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SettingListComponent } from './setting-list/setting-list.component';
import { SettingComponent } from './setting/setting.component';
import { SettingService } from './shared/setting.service';

const PARAMETRE_ROUTER: Routes = [
  { path: '', component: SettingListComponent,canActivate: [AuthGuard] },
  { path: 'edit', component: SettingComponent,canActivate: [AuthGuard] },
  { path: 'edit/:id', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: SettingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(PARAMETRE_ROUTER),
  ],
  declarations: [SettingListComponent, SettingComponent],
  providers: [SettingService]
})
export class SettingModule { }
