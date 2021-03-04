import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-idCard-details',
  templateUrl: './idCard-details.component.html',
  styleUrls: ['./idCard-details.component.scss']
})
export class IdCardDetailComponent implements OnInit
{
  Form: FormGroup;
  checked: boolean = false;
  account: any = [];
  id: any;
  sub: Subscription;
  constructor(protected auth: AuthVisitorService,
    protected alertService: AlertService,
    protected formbuilder: FormBuilder,
    protected router: Router,
    protected _route: ActivatedRoute,)
  {
    this.sub = this._route.params.subscribe(params =>
      {
        this.id = params['id'];
        if (this.id != '') 
        {
          this.id=this.id;
        }
      });
  }

  onIdcard():void
  {
    this.router.navigateByUrl('idCard-verification/'+this.id)
  }

  ngOnInit(): void
  {

  }

}
