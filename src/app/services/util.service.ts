import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  // loader: Subject;
  constructor() { }

  loader = new Subject<any>();

  showLoader() {
    this.loader.next(true);
  }

  hideLoader() {
   this.loader.next(false);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (controlName == null && matchingControlName == null || matchingControlName == '' && controlName == '' || matchingControlName == '' && controlName == undefined)
        {
          return;
         
        }
        else
        {
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

       
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        }
        
    }
  }
}
