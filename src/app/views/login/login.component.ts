
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthVisitorService } from 'src/app/services/auth-visitor.service';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { UserAppSelectorService } from 'src/app/services/app-selector.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginUserComponent implements OnInit
{
	failureAlert = false;
	theLoginForm: FormGroup;
	alertMsg: string;
	id: any;
	sub: Subscription;
	user: SocialUser;
	loggedIn: boolean;
	res: any;
	socialAuth: string;
	type: any;
	showbutton: boolean = false;
	profileData: any;
	appSelectorSubscription: Subscription;
	constructor(private authService: SocialAuthService, protected dialogref: MatDialogRef<LoginUserComponent>,
		protected formbuilder: FormBuilder,
		protected router: Router,
		protected auth: AuthVisitorService,
		protected _route: ActivatedRoute,
		protected main: MainService,
		protected location: Location, protected alertService: AlertService, protected appSelectorService: UserAppSelectorService,
	)
	{
		this.theLoginForm = this.formbuilder.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.minLength(6), Validators.required]],
		})
	}

	ngOnInit()
	{

		this.authService.authState.subscribe((user) =>
		{

			this.socialAuth = user.authToken


			this.user = user;
			``
			this.loggedIn = (user != null);
			if (user != null)
			{
				if (user.provider == "FACEBOOK")
				{
					console.log("useruseruseruser",user)
					this.socialFBUser(user);
				}
				else
				{
					this.socialUser(this.socialAuth);
					
				}
				
				
			}

		});

	}
	setType(val): any
	{
		if (val == 'seller')
		{
			this.type = val;
			this.showbutton = true;
		}
		else if (val == 'buyer')
		{
			this.type = val;
			this.showbutton = true;
		}
		else
		{

			this.type = ''
			this.showbutton = false;
		}
		console.log("event value", val)
	}

	socialFBUser(social): void
	{
		let url = 'auth/loginWithFacebook';
		this.auth.postData(url, {id:social.id, first_name:social.firstName, last_name:social.lastName, email:social.email, type: this.type }).then(response =>
		{
			if (response.status == 200)
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
				let phoneNumber = result.data.user?.phoneNumber;
				let type = result.data.user?.type;



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
						image: image,
						phoneNumber: phoneNumber,
						type: type

					}
				));
				let val = {

					id: response.data.user.id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					image: response.data.user.image,
					// showLogin : false
				}
				this.appSelectorService.setUserData(val);
				localStorage.setItem('NewUser',JSON.stringify(val));
				if (response.data.user.type == 'buyer')
				{
					this.alertService.alertSuccess('Message', 'Login Successful, Welcome to Ecommerce Site')
						.then(result =>
						{
							localStorage.setItem('auth_token', response.data.auth_token);

							this.dialogref.close();
						});
					return result;
				}
				else if (response.data.user.type == 'seller')
				{
					localStorage.setItem('auth_token', response.data.auth_token);
					if (response.data.user.cnic_status == "0")
					{
						if (response.data.user.cnicBack == "" || response.data.user.cnicFront == "" || response.data.user.cnicBack == null || response.data.user.cnicFront == null)
						{
							this.router.navigateByUrl('idCard-verification/' + response.data.user.id);
						}
						else
						{
							this.alertService.alertSuccess('Message', 'Admin not verify your Cnic. Please wait for admin Verification').then(result =>
								{
									// localStorage.clear();
									this.dialogref.close(location.reload());
								});
						}
					}

					else if (response.data.user.cnic_status == "1")
					{
						this.alertService.alertSuccess('Message', 'Welcome to E-Com').then(result=>
							{
								this.dialogref.close();
								this.router.navigateByUrl("home")
							})
					}
				}

			}
		});
	}
	socialUser(social): void
	{
		let url = 'auth/getUserInfo';
		this.auth.postData(url, { access_token: social, type: this.type }).then(response =>
		{
			if (response.status == 200)
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
				let phoneNumber = result.data.user?.phoneNumber;
				let type = result.data.user?.type;



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
						image: image,
						phoneNumber: phoneNumber,
						type: type

					}
				));
				let val = {

					id: response.data.user.id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					image: response.data.user.image,
					// showLogin : false
				}
				this.appSelectorService.setUserData(val);
				localStorage.setItem('NewUser',JSON.stringify(val));
				if (response.data.user.type == 'buyer')
				{
					this.alertService.alertSuccess('Message', 'Login Successful, Welcome to Ecommerce Site')
						.then(result =>
						{
							localStorage.setItem('auth_token', response.data.auth_token);

							this.dialogref.close();
						});
					return result;
				}
				else if (response.data.user.type == 'seller')
				{
					localStorage.setItem('auth_token', response.data.auth_token);
					if (response.data.user.cnic_status == "0")
					{
						if (response.data.user.cnicBack == "" || response.data.user.cnicFront == "" || response.data.user.cnicBack == null || response.data.user.cnicFront == null)
						{
							this.router.navigateByUrl('idCard-verification/' + response.data.user.id);
						}
						else
						{
							this.alertService.alertSuccess('Message', 'Admin not verify your Cnic. Please wait for admin Verification').then(result =>
								{
									// localStorage.clear();
									this.dialogref.close(location.reload());
								});
						}
					}

					else if (response.data.user.cnic_status == "1")
					{
						this.alertService.alertSuccess('Message', 'Welcome to E-Com').then(result=>
							{
								this.dialogref.close();
								this.router.navigateByUrl("home")
							})
					}
				}

			}
		});
	}


	refreshToken(): void
	{
		this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
	}
	signInWithGoogle(): void
	{
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

	}


	signInWithFB(): void
	{
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	signOut(): void
	{
		this.authService.signOut();
	}

	doLogin()
	{
		this.auth.login(this.theLoginForm.value).then(response =>
		{
			if (response.status == 200)
			{
				localStorage.setItem('auth_token', response.data.auth_token);
				let val = {

					id: response.data.user.id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					image: response.data.user.image,
					showLogin : false
				}
				this.appSelectorService.setUserData(val);
				localStorage.setItem('NewUser',JSON.stringify(val));
				this.alertService.alertSuccess('Message', 'Login Successful, Welcome to Ecommerce Site')
					.then(result =>
					{
						this.dialogref.close();
					});

			}
			else if (response.status == 400)
			{
				if (response.error.status == 400)
				{
					this.res = response.error.data;
					this.alertService.alertError('Message', 'User is not verified Yet')
						.then(result =>
						{
							this.router.navigateByUrl('mobile-verification/' + this.res.user_id + '/' + this.res.user_type)
						});
				}
				else if (response.error.status == 402)
				{
					this.alertService.alertError('Message', 'User is not verified Yet')
						.then(result =>
						{
							this.res = response.error.data;
							this.router.navigateByUrl('idCard-verification/' + this.res.user_id);
						});
				}



			}
			else
			{
				this.failureAlert = true;
				this.alertMsg = "Email or Password is incorrect, try again or click on forgot password to reset it.";

				setTimeout(function ()
				{
					this.failureAlert = false;
				}.bind(this), 2500);
			}
		},
			Error =>
			{
				this.failureAlert = true;
				this.alertMsg = "Email or Password is incorrect, try again or click on forgot password to reset it.";

				setTimeout(function ()
				{
					this.failureAlert = false;
				}.bind(this), 3000);
			});
	}

}
