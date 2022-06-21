import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/components/layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
   { path: 'login', loadChildren: () => import('src/app/shared/components/login/login.module').then(m => m.LoginModule)},
    { path: '', component: LayoutComponent,canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('src/app/main/components/home/home.module').then(m => m.HomeModule)},
            { path: 'users', loadChildren: () => import('src/app/main/components/administration/user/user.module').then(m => m.UserModule)},
            { path: 'users_clone', loadChildren: () => import('src/app/main/components/administration/user_clone/user.module').then(m => m.UserModule)},
            { path: 'excelsheet', loadChildren: () => import('src/app/main/components/administration/excelsheet/excelsheet.module').then(m => m.HomeModule)},
            { path: 'roles', loadChildren: () => import('src/app/main/components/administration/role/role.module').then(m => m.RoleModule)},
            { path: 'profil', loadChildren: () => import('src/app/main/components/profil/profil.module').then(m => m.ProfilModule)},
            { path: 'settings', loadChildren: () => import('src/app/main/components/administration/setting/setting.module').then(m => m.SettingModule)},
           
        ],
    },
    { path: 'not-authorized', loadChildren: () => import('src/app/shared/components/not-authorized/not-authorized.module').then(m => m.NotAuthorizedModule)},
    { path: '**', loadChildren: () => import('src/app/shared/components/not-found/not-found.module').then(m => m.NotFoundModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule],
    providers: []
  })
  export class AppRoutingModule {}

