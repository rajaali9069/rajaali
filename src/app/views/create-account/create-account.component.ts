import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateUserAccountComponent implements OnInit
{
  Form: FormGroup;
  checked: boolean = false;
  account: any = [];
  constructor(protected auth: AuthVisitorService,
    protected alertService: AlertService,
    protected formbuilder: FormBuilder,
    protected router: Router)
  {
    this.Form = this.formbuilder.group({
      first_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      last_name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      user_name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      type: ['buyer', [Validators.required]],
      city: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      post_code: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  getValue(name)
  {
    return this.Form.get(name);
  }

  ngOnInit(): void
  {

  }

  checkbox(check): void
  {
    this.checked = false;
    if (check == '')
    {
      this.checked = true;
    }
    else
    {
      this.checked = false;
    }
    console.log(" this.checked", this.checked)
  }

  setType(val): any
  {
    if (val == 'buyer') 
    {
      this.Form.get('type').setValue(val);
    }
    else if (val == 'seller')
    {
      this.Form.get('type').setValue(val);
    }
    else
    {
      this.Form.get('type').setValue('buyer');
    }
  }

  doSubmit(): void 
  {
    let url = '';
    url = 'auth/register';
    this.auth.postData(url, this.Form.value).then(response =>
    {

      if (response.status == '200') 
      {
        this.account = response.data;
        this.alertService.alertSuccess('Message', 'OTP send to your email please verify it').then(res =>
        {
          this.router.navigateByUrl('mobile-verification/' + this.account.id +'/'+ this.Form.get('type').value)
        });
      }
      else
      {
        this.alertService.alertError('Error', 'Email Already Used');
      }
    });
  }
}
