import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit
{
  Form: FormGroup;
  constructor(
    protected formbuilder: FormBuilder,
    protected auth: AuthVisitorService,
    protected alertService: AlertService,
    protected router: Router)
  {

  }

  ngOnInit(): void
  {

  }
  onNewPassword():void
  {
    this.router.navigateByUrl('reset-password')
  }


}
