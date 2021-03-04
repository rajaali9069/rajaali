import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appConfig } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthVisitorService
{

  // baseUrl = 'http://13.126.174.129:3004/api/v1/';
  token: any;

  constructor(private http: HttpClient)
  {
    // this.token = JSON.parse(localStorage.getItem('VTS'));
    // this.token = this.token?.auth_token;
   
    // if(this.token==null) this.jwtToken = this.authenticationService.loadToken();
  }

  // login(user): Observable<any> {
  //   return this.http.post(appConfig.baseUrl + 'visitors/login', user);
  // }

  createUser(user): Observable<any>
  {
    return this.http.post(appConfig.baseUrl + 'visitors/signup', user);
  }

  sendVerificationEmail(email): Observable<any>
  {
    return this.http.post(appConfig.baseUrl + 'visitors/forgot', email);
  }

  verifyCode(code): Observable<any>
  {
    return this.http.post(appConfig.baseUrl + 'visitors/checkCode', code);
  }

  resetPassword(pass): Observable<any>
  {
    return this.http.post(appConfig.baseUrl + 'visitors/resetPassword', pass);
  }

  logout(user): Promise<any> {
    this.token = localStorage.getItem('auth_token');
    this.token = this.token;
    return this.http.post(appConfig.baseUrl + 'auth/logout', {}, { headers: { Authorization : this.token }})
    .toPromise().then((response: any) =>
    {
      if (response.status === 401) 
      {
        localStorage.clear();
        window.location.reload();
      }
      else 
      {
        return response;
      }
    },
      (reason: any) =>
      {
        if (reason.error.status === 401) 
        {
          localStorage.clear();
          window.location.reload();
          return reason;
        }
        return reason;

      }).catch(this.handleError);
}


	onLogout(): Promise<any>
	{
  
		return this.http.post(appConfig.baseUrl + 'visitors/logout', { headers: { Authorization:this.token }})
			.toPromise().then((response: any) =>
			{
				if (response.status === 401) 
				{
					// localStorage.clear();
					// this.router.navigate(['auth/login']);
					// window.location.reload();
				} 
				else 
				{
					return response.body;
				}
			},
			(reason: any) =>
			{
				if (reason.error.status === 401) 
				{
					// localStorage.clear();
					// this.router.navigate(['auth/login']);
					// window.location.reload();
					// return reason;
				} 
				return reason;
	
			}).catch(this.handleError);
	}

  public login(user): Promise<any>
  {
    return this.http.post(appConfig.baseUrl + 'auth/login', user)
      .toPromise().then((response: any) =>
      {
        let result: any = response;
        let auth_token = result.data.auth_token;
        let id = result.data.user?.id;
        let firstName = result.data.user?.firstName;
        let lastName = result.data.user?.lastName;
        let address = result.data.user?.address;
        let city = result.data.user?.city;
        let cnicBack = result.data.user?.cnicBack;
        let cnicFront = result.data.user?.cnicFront;
        let email = result.data.user?.email;
        let postCode = result.data.user?.postCode;
        let userName = result.data.user?.userName;
        let image = result.data.user?.image;
    

        localStorage.setItem('Ecom', JSON.stringify(
          {
            auth_token: auth_token,
            id: id,
            firstName: firstName,
            email: email,
            lastName: lastName,
            address: address,
            city: city,
            cnicBack: cnicBack,
            cnicFront: cnicFront,
            postCode: postCode,
            userName: userName,
            image:image
          }
        ));

        return result;
      },
        (reason: any) =>
        {
          return reason;
        }).catch(this.handleError);
  }
  postData(url: string, formData: any): Promise<any>
  {
    return this.http.post(appConfig.baseUrl + url, formData)
      .toPromise().then((response: any) =>
      {
        if (response.status === 401) 
        {
          localStorage.clear();
          window.location.reload();
        }
        else 
        {
          return response;
        }
      },
        (reason: any) =>
        {
          if (reason.error.status === 401) 
          {
            localStorage.clear();
            window.location.reload();
            return reason;
          }
          return reason;

        }).catch(this.handleError);
  }
  patchData(apiSlug: string, formData: any): Promise<any>
  {


    let url = '';
    return this.http.patch(url + apiSlug, formData)
      .toPromise().then((response: any) =>
      {
        if (response.status === 401) 
        {
          localStorage.clear();
          window.location.reload();
        }
        else 
        {
          return response;
        }
      },
        (reason: any) =>
        {
          if (reason.error.status === 401) 
          {
            localStorage.clear();
            window.location.reload();
            return reason;
          }
          return reason;

        }).catch(this.handleError);
  }
  public handleError(error: any): Promise<any>
  {
    return error;
  }
}
