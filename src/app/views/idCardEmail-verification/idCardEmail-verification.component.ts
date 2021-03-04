import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';
import { SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-idCardEmail-verification',
  templateUrl: './idCardEmail-verification.component.html',
  styleUrls: ['./idCardEmail-verification.component.scss']
})
export class IdCardEmailVerificationComponent implements OnInit
{
  Form: FormGroup;
  constructor(
    protected formbuilder: FormBuilder,
    protected auth: AuthVisitorService,
    protected alertService: AlertService,
    protected router: Router,private authService: SocialAuthService,)
  {

  }

  ngOnInit(): void
  {

  }
  onNewPassword():void
  {
    this.router.navigateByUrl('home');
    this.signOut();
    this.logout();
  }
  logout(): void
  {

    this.auth.logout({}).then(result =>
    {

      if (result.status === 200)
      {
        localStorage.clear();

        // this.router.navigateByUrl('home');
        // this.showLogin = true;
        window.location.reload()
      }
    });
  }
  signOut(): void
	{
		this.authService.signOut();
	}

}
