import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuards implements CanActivate
{
	constructor(private router: Router) { }
	canActivate()
	{
		let ECOM = JSON.parse(localStorage.getItem('Ecom'));
        if (ECOM && ECOM != null)
        {
         
            return true;
        }
		else
		{
            
            this.router.navigate(['home']);
			return false;
        }
    
	}
}
