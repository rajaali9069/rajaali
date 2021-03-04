import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordUserComponent implements OnInit
{
  Form: FormGroup;
  constructor(
    protected formbuilder: FormBuilder,
    protected auth:AuthVisitorService,
    protected  alertService:AlertService,
    protected router: Router)
  {
    this.Form = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
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
    url = 'auth/forgot';
    this.auth.postData( url, this.Form.value).then(response =>
      {
  
        if (response.status == '200') 
        {
          this.router.navigateByUrl('email-verification')
        }
        else if (response.status == '404')
        {
          this.alertService.alertError('Error', 'No user found with this email');
        } 
        else if (response.status == '400')
        {
          this.alertService.alertError('Error', 'Email is required.');
        } 
        else
        {
          this.alertService.alertError('Error', 'Please Enter Correct Email');
        }
      });
  }

}
