import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit
{
  Form: FormGroup;
  constructor(
    protected formbuilder: FormBuilder,
    protected auth:AuthVisitorService,
    protected  alertService:AlertService,
    protected utilService: UtilService,
    protected router: Router)
  {
  
  }

  ngOnInit(): void
  {

  }



  
}
