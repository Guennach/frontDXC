import { Component, OnInit } from '@angular/core';
import { UserService } from '../administration/user/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../shared/components/login/login.service';
import { TranslationService } from '../../../shared/services/translationService';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  providers: [UserService]
})
export class ProfilComponent implements OnInit {

  modificationEmail;
  modificationPassword;
  email;
  newPassword;
  currentPassword;
  curentPassword; // for email change
  confirmeNewPassword;

  constructor(private userService: UserService
    , private toastr: ToastrService,
    private loginService: LoginService,
    private translationService: TranslationService) { }

  ngOnInit(): void {
    this.email = this.loginService.getCurrentUser().email;
  }

  changeEmail(form) {
    this.userService.changeEmail(form).subscribe((res: any) => {
      if (res.result == true || res.result == "true") {
        this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
        this.loginService.login(this.email, this.curentPassword).subscribe();
        this.modificationPassword = '';
        this.curentPassword = '';
      } else {
        this.toastr.error(this.translationService.getMessage('GLOBAL.INCORRECT_PASSWORD'));
      }
    },
      err => {
        this.toastr.error(this.translationService.getMessage('GLOBAL.ERROR'));
      }
    );
  }

  changePassword(form2) {
    if (form2.newPassword != form2.confirmeNewPassword) {
      this.toastr.error(this.translationService.getMessage('PROFILE.NO_IDENTICAL_PASSWORD'));
    } else {
      this.userService.changePassword(form2).subscribe((res: any) => {
        if (res.result == true || res.result == "true") {
          this.toastr.success(this.translationService.getMessage('GLOBAL.MODIFICATION_SUCCEED'));
          this.newPassword = '';
          this.currentPassword = '';
          this.confirmeNewPassword = '';
        }
        else {
          this.toastr.error(this.translationService.getMessage('GLOBAL.INCORRECT_PASSWORD'));
        }
      },
        err => {
          this.toastr.error(this.translationService.getMessage('GLOBAL.ERROR'));
        }
      );
    }
  }
}


