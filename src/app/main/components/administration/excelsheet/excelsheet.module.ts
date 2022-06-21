import { AuthGuard } from './../../../../core/guards/auth.guard';
import { NgModule , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared.module';
import {ExcelsheetComponent} from './excelsheet.component';

const HOME_ROUTER: Routes = [
  { path: '', component: ExcelsheetComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(HOME_ROUTER)
  ],
  declarations: [ExcelsheetComponent]
})
export class HomeModule {}
