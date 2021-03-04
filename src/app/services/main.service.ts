import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class MainService
{

	// baseUrl = 'http://13.126.174.129:3004/api/v1/';
	token = localStorage.getItem('auth_token');
	constructor(private http: HttpClient)
	{
		if (!this.token)
		{
			this.token = '';
		}
	}

	get(endpoint): Promise<any>
	{	this.token = localStorage.getItem('auth_token');
		return this.http.get(appConfig.baseUrl + endpoint, { headers: { Authorization: this.token } })
		.toPromise().then((response: any) =>
		{
		  if (response.status === 401) 
		  {
			// localStorage.clear();
			// window.location.reload();
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
			//   localStorage.clear();
			//   window.location.reload();
			  return reason;
			}
			return reason;
  
		  }).catch(this.handleError);
	}
	

	post(endpoint, body): Promise<any>
	{
		return this.http.post(appConfig.baseUrl + endpoint, body, { headers: { Authorization: this.token } })
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
	

	// postProgress(endpoint, body): Promise<any>
	// {
	// 	return this.http.post(appConfig.baseUrl + endpoint, body, { headers: { Authorization: this.token }, reportProgress: true, observe: 'events' })
	// 	.toPromise().then((response: any) =>
	// 	{
	// 	  if (response.status === 401) 
	// 	  {
	// 		localStorage.clear();
	// 		window.location.reload();
	// 	  }
	// 	  else 
	// 	  {
	// 		return response;
	// 	  }
	// 	},
	// 	  (reason: any) =>
	// 	  {
	// 		if (reason.error.status === 401) 
	// 		{
	// 		  localStorage.clear();
	// 		  window.location.reload();
	// 		  return reason;
	// 		}
	// 		return reason;
  
	// 	  }).catch(this.handleError);
	// }

	postProgress(endpoint, body): Observable<any>
	{
		return this.http.post(appConfig.baseUrl + endpoint, body, { headers: { Authorization: this.token }, reportProgress: true, observe: 'events' });
	}
	patchProgress(endpoint, body): Observable<any>
	{
		return this.http.patch(appConfig.baseUrl + endpoint, body, { headers: { Authorization: this.token }, reportProgress: true, observe: 'events' });
	}


	patch(endpoint, body): Promise<any>
	{
		return this.http.patch(appConfig.baseUrl + endpoint, body, { headers: { Authorization: this.token } })
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

	delete(endpoint): Observable<any>
	{
		return this.http.delete(appConfig.baseUrl + endpoint, { headers: { Authorization: this.token } });
	}
	public handleError(error: any): Promise<any>
	{
	  return error;
	}
}
