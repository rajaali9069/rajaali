import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.scss']
})
export class MobileVerificationComponent implements OnInit
{
  Form: FormGroup;
  sub: Subscription;
  id: any;
  type: any;
  maintype: any;
  constructor(
    protected _route: ActivatedRoute,
    protected auth: AuthVisitorService,
    protected formbuilder: FormBuilder,
    protected alertService: AlertService,
    protected router: Router)
  {
    this.Form = this.formbuilder.group({
      verify_code: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      user_id: [null],
    });
  }

  ngOnInit(): void
  {
    this.sub = this._route.params.subscribe(params =>
    {
      this.id = params['id'];
      this.type = params['type'];


      if (this.id != '') 
      {
        this.Form.get('user_id').setValue(this.id);
      }
      if (this.type == 'saller') 
      {
        this.maintype = this.type;

      }
      else
      {
        this.maintype = this.type;
      }
    });
  }

  getValue(name)
  {
    return this.Form.get(name);
  }

  doSubmit(): void 
  {
    let url = '';
    url = 'auth/verifyPhone'
    this.auth.postData( url, this.Form.value).then(response =>
    {
      if (response.status == '200')
      {
        this.alertService.alertSuccess('Message', 'Your account verifyed successfully');
        if (this.maintype == 'seller')
        {
           this.router.navigateByUrl('idCard-details/'+this.id);
        }
        else
        {
           this.router.navigateByUrl('home');
        }
      }
      else
      {
        this.alertService.alertError('Error', 'Invalid Code');
      }
    });
  }

}
