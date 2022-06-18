import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    returnUrl!: string;
    defaultPage = 'home';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.loginService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/${this.defaultPage}`;
    }

    login(login, password) {
        this.loading = true;

        this.router.navigate([this.returnUrl]);

        this.loginService.login(login, password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                },
                error => {
                    this.toastr.error('Une erreur s\'est produite');
                    this.loading = false;
                });
    }

}
