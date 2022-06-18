import { Component, OnInit } from '@angular/core';
import { UserService } from '../administration/user/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../shared/components/login/login.service';
import { TranslationService } from '../../../shared/services/translationService';
import { GlobalConstant } from 'src/app/core/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  isArabNavigation;
  globalConstant = GlobalConstant;
  constructor(private translationService: TranslationService) {

  }
  ngOnInit() {
    this.translationService.translate.onLangChange.subscribe(() => {
      this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
    });
   
  }

}


