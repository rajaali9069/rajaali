import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAppSelectorService } from 'src/app/services/app-selector.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { LoginUserComponent } from 'src/app/views/login/login.component';
import { appConfig } from 'src/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
  fName: any;
  lName: any;
  showLogin: boolean = true;
  image: any;
  imgSrc: string;
  appSelectorSubscription: Subscription;
  Profile: any;

  constructor(protected dialog: MatDialog, protected router: Router,
    protected _route: ActivatedRoute, protected auth: AuthVisitorService, protected appSelectorService: UserAppSelectorService,) { }

  ngOnInit(): void
  {
   
    // this.Profile={};
    // let local = JSON.parse(localStorage.getItem('Ecom'));
    // this.fName = local.firstName;
    // this.lName = local.lastName;
    // this.image = local.image;
    // if (this.fName == null || this.fName == '' || this.fName == {})
    // {

    //   this.showLogin = true;
    // }
    // else
    // {
    //   this.imgSrc = appConfig.file_url + this.image;
    //   this.showLogin = false;

    // }
    let local = JSON.parse(localStorage.getItem('NewUser'));
    console.log('UrbanpointAdmin', local);

    if (local != null)
    {
      this.fName = local.firstName;
      this.lName = local.lastName;
      this.image = local.image;
      this.imgSrc = appConfig.file_url + this.image;
      this.showLogin = false;
    }
    else
    {
      this.showLogin = true;
    }
    this.appSelectorSubscription = this.appSelectorService.UserData.subscribe((response: any) =>
    {
      this.Profile = response;
      this.fName = this.Profile.firstName;
      this.lName = this.Profile.lastName;
      this.image = this.Profile.image;
      this.imgSrc = appConfig.file_url + this.image;
      this.showLogin = false;
    });
  }
  // callBack()
  // {
  //   this.router.navigateByUrl('callBack')
  // }
  // Privacy()
  // {
  //   this.router.navigateByUrl('privacy')
  // }
  // Terms()
  // {
  //   this.router.navigateByUrl('terms')
  // }
  login(): void
  {
    let dialogRef = this.dialog.open(LoginUserComponent);
    this.router.events
      .subscribe(() =>
      {
        dialogRef.close();

      });
  }
  logout(): void
  {

    this.auth.logout({}).then(result =>
    {

      if (result.status === 200)
      {
        this.router.navigateByUrl('home');
        localStorage.clear();

        // this.router.navigateByUrl('home');
        this.showLogin = true;
        // window.location.reload()
      }
    });
  }
}
