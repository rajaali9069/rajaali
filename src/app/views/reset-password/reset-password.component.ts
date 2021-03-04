import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordUserComponent implements OnInit
{
  Form: FormGroup;
  constructor(
    protected formbuilder: FormBuilder,
    protected auth:AuthVisitorService,
    protected  alertService:AlertService,
    protected utilService: UtilService,
    protected router: Router)
  {
    this.Form = this.formbuilder.group({
      reset_code: [null, [Validators.required,Validators.maxLength(4)]],
      new_password: [null, [Validators.required,Validators.minLength(6)] ],
    });
  }

  ngOnInit(): void
  {

  }

  getValue(name)
  {
    return this.Form.get(name);
  }

  doSubmit(): void 
  {

    let url = '';
    url = 'auth/resetPassword';
    this.auth.postData( url, this.Form.value).then(response =>
      {
  
        if (response.status == '200') 
        {
          this.alertService.alertSuccess('Message', 'Password changed successfully')
					.then(result =>
					{
						
						this.router.navigateByUrl('home')
						
					});
				
        }
        // else if (response.status == '404')
        // {
        //   this.alertService.alertError('Error', 'No user found with this email');
        // } 
        // else if (response.status == '400')
        // {
        //   this.alertService.alertError('Error', 'Email is required.');
        // } 
        else
        {
          this.alertService.alertError('Error', 'Please Enter Correct Code');
        }
      });
  }

}
