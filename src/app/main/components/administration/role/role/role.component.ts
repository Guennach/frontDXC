import { Component, OnInit } from '@angular/core';
import { RoleService } from '../shared/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { Role } from 'src/app/main/model/Role';
import { TranslationService } from 'src/app/shared/services/translationService';
import { Acces } from 'src/app/main/model/Acces';
import { AccesService } from '../../acces/shared/acces.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  role;
  accesList;

  constructor(private roleService: RoleService, private route: ActivatedRoute
              , private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService
              , private router: Router, private translationService: TranslationService, private accesService: AccesService) { }

  ngOnInit() {
    this.role = new Role();
    this.route.params.subscribe(params => {
        if (params['id']) {
          this.roleService.get(params['id']).subscribe(role => {
            this.role = role;
          });
        }

        this.accesList = new Array<Acces>();
        this.accesService.getAllByMapId('MAPPING_ACCES_SIMPLE').subscribe(((data: any) => {
          this.accesList = data;
        }));
      }
    );
  }

  save() {
    if (!this.role.id) {
      this.role.deleted = false;
    }
    this.roleService.save(this.role).subscribe(
      res => {
        this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
        this.returnToListPage();
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }
  
  cancel() {
    this.confirmationDialogService.confirm(this.translationService.getMessage('GLOBAL.CONFIRMATION')
      , this.translationService.getMessage('GLOBAL.MESSAGE_ANNULATION'))
    .then((confirmed) => {
      this.returnToListPage();
    })
    .catch(() => console.log('Anuulé'));
  }

  returnToListPage() {
    this.router.navigate([`/roles`]);
  }

  compareAcces(selectedAcces, optionAcces): boolean {
    return selectedAcces && optionAcces ? selectedAcces.id === optionAcces.id : false ;
  }

}
