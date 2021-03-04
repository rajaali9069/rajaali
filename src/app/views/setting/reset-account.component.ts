import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { UserAppSelectorService } from 'src/app/services/app-selector.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { MainService } from 'src/app/services/main.service';
import { UtilService } from 'src/app/services/util.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetUserAccountComponent implements OnInit
{
  Ecom = JSON.parse(localStorage.getItem('Ecom'));
  Form: FormGroup;
  checked: boolean = false;
  account: any = [];
  profileData: any;
  file: File;
  appSelectorSubscription: Subscription;

  constructor(protected auth: AuthVisitorService,
    protected alertService: AlertService,
    protected formbuilder: FormBuilder,
    protected router: Router,
    protected main: MainService, protected utilService: UtilService, protected appSelectorService: UserAppSelectorService,)
  {
    this.Form = this.formbuilder.group({
      fname: [null, [Validators.pattern('[a-zA-Z ]*')]],
      lname: [null, [Validators.pattern('[a-zA-Z ]*')]],
      user_name: [null, [Validators.required]],
      address: [null],
      // type: ['buyer', [Validators.required]],
      city: [null, [Validators.pattern('[a-zA-Z ]*')]],
      post_code: [null],
      email: [null, [Validators.email]],
      phone_number: [null, [Validators.pattern('^[0-9]+$')]],
      newPassword: [''],
      confirmPassword: [''],
    }, { validator: this.utilService.MustMatch('newPassword', 'confirmPassword') });
  }

  getValue(name)
  {
    return this.Form.get(name);
  }

  ngOnInit(): void
  {
    this.userLoginProfile();

  }

  userLoginProfile(): void
  {

    this.main.get('auth/userProfile').then(response =>
    {
      if (response.status == 200)
      {
        this.profileData = response.data;
        // localStorage.setItem('updatedProfile', JSON.stringify(this.profileData.profile));
        this.Form.patchValue({
          fname: this.profileData.profile.firstName,
          lname: this.profileData.profile.lastName,
          user_name: this.profileData.profile.userName,
          address: this.profileData.profile.address,
          // type: this.profileData.profile.type,
          city: this.profileData.profile.city,
          post_code: this.profileData.profile.postCode,
          email: this.profileData.profile.email,
          phone_number: this.profileData.profile.phoneNumber,
          // newPassword: this.profileData.profile.password,
          image: this.profileData.profile.image,
        });
        let val = {
					id: this.profileData.profile.id,
					firstName: this.profileData.profile.firstName,
					lastName: this.profileData.profile.lastName,
					image: this.profileData.profile.image,
          // showLogin : false
				}
				this.appSelectorService.setUserData(val);
        localStorage.setItem('NewUser',JSON.stringify(val));
      }
    });
  }
  getImage(item, location): any
  {
    return appConfig.file_url + this.profileData?.profile.image;
    // return this.profileData.profile.image;
  }
  onFileSelect(event, item): void
  {

    if (item == 1)
    {
      this.file = event.file;
      console.log("this.file1", this.file)
    }
  }
  doSubmit(): void
{
    let formData = new FormData();
    for (var key in this.Form.value)
    {
      formData.append(key, this.Form.value[key]);
    }
    formData.append('image', this.file);


    this.main.post('auth/changeSettings', formData).then(response =>
    {

      if (response.status == '200') 
      {
        this.account = response.data;
        let val = {
					id: this.account.user.id,
					firstName: this.account.user.firstName,
					lastName: this.account.user.lastName,
					image: this.account.user.image,
          // showLogin : false
				}
        
				this.appSelectorService.setUserData(val);
        localStorage.setItem('NewUser',JSON.stringify(val));
        this.alertService.alertSuccess('Message', 'Your Profile is successfully updated').then(res =>
        {
          this.router.navigateByUrl('home');
          // window.location.reload();

        });
      }
      else
      {
        this.alertService.alertError('Error', response.error.message);
      }
    });
  }
}
