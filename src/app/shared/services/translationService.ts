import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' } )
export class TranslationService {

    constructor(public translate: TranslateService) {
    }

    public getMessage(key: string) {
        return this.translate.instant(key);
    }

    getCurrentLanguage() {
        return  this.translate.currentLang ? this.translate.currentLang :  this.translate.defaultLang;
    }

    public getCurrentUserLanguage() {
        return localStorage.getItem('currentLang');
    }

    public setCurrentUserLanguage(lang) {
        localStorage.setItem('currentLang', lang);
    }


    public isCurrentLang(lang: string) {
        return lang === this.getCurrentLanguage();
    }

    public onLangChange(){
        return this.translate.onLangChange;
    }


}
