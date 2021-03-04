import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';
import { appConfig } from 'src/config';


@Component({
  selector: 'app-idCard-verification',
  templateUrl: './idCard-verification.component.html',
  styleUrls: ['./idCard-verification.component.scss']
})
export class IdCardVerificationComponent implements OnInit
{
  Form: FormGroup;
  checked: boolean = false;
  account: any = [];
  selectedImages: any = [
		{ a: '' }, { b: '' }, { c: '' }, { d: '' }, { e: '' }
	];
  id: any;
  sub: Subscription;
  file1: File;
  file2: File;
  onsumbit: boolean = false;
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

  ngOnInit(): void
  {

  }
  getImage(item, location): any
	{
		return '';
	}
  onFileSelect(event,item):void
  {
  
    if(item == 1)
    {
      this.file1 = event.file;
      console.log("this.file1",this.file1)
    }
    if (item == 2)
    {
      this.file2 = event.file;
      console.log("this.file2",this.file2)
    }
    if (this.file1 != null && this.file2 != null)
    {
      this.onsumbit = true;
    }
    else
    {
      this.onsumbit = false;
    }
  }
  oncardVerification():void
 {
   let dist=
   {
    user_id:this.id,
    cnic_front:this.file1,
    cnic_back:this.file2,
   }
   let formData = new FormData();

     formData.append('user_id',this.id );
     formData.append('cnic_front',this.file1);
     formData.append('cnic_back',this.file2 );
   
   let url = '';
   url = 'auth/verifyCnic';
   this.auth.postData( url, formData).then(response =>
   {

     if (response.status == '200') 
     {
       this.account = response.data;
       this.alertService.alertSuccess('Message', 'User CNIC uploaded successfully').then(res =>
       {
         this.router.navigateByUrl('idCardEmail-verification')
       });
     }
     else
     {
       this.alertService.alertError('Error', 'Invalid Information');
     }
   });
  
 }
 



  doSubmit(): void 
  {
   
  }
}
