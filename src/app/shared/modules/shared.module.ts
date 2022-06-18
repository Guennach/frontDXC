import { SpinnerService } from './../services/spinner.service';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { NgbModule, NgbActiveModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/httpService';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { TranslationService } from '../services/translationService';
import { UtilsService } from '../services/utilsService';
import { PipesModule } from '../pipes/pipes.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from '../components/login/login.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../directives/directives.module';
import { ModalDialogService } from '../components/modal-dialog/modal-dialog.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbModule,
        TranslateModule.forChild(),
        DataTablesModule,
        PipesModule,
        MatDatepickerModule,
        NgxPaginationModule,
        DirectivesModule,
        NgSelectModule,
        PdfViewerModule,
        TagInputModule

    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        DataTablesModule,
        PipesModule,
        MatDatepickerModule,
        NgxPaginationModule,
        DirectivesModule,
        NgSelectModule,
        PdfViewerModule,
        TagInputModule,
        SpinnerComponent,
        NgbModule,
        TagInputModule
    ],
    declarations: [ConfirmationDialogComponent, SpinnerComponent, ModalDialogComponent ],
    providers: [HttpService, ConfirmationDialogService, TranslationService, UtilsService, LoginService, ModalDialogService, NgbActiveModal
                , SpinnerService, NgbTimepickerConfig],
    entryComponents: [ConfirmationDialogComponent , ModalDialogComponent]
})
export class SharedModule { }