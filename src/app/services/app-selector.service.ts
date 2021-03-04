import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserAppSelectorService 
{
    UserData: Subject<any> = new Subject<any>();
    userDataValue: any;
    userAppData: any;

	constructor() 
	{
        // this.isLoadingEvent.next(false);
        this.userAppData = null;
	}

	setUserData(val)
	{
        this.userAppData = val;
		this.UserData.next(val);
    }
    
    getUserData()
	{
        if(this.userDataValue != null)
        {
            return this.userDataValue;
        }
	}
    ngOnDestroy(): void 
	{
		// this.loaderSubscription.unsubscribe();
	}
}
