import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateMainAppComponent } from './template/template-main-app/template-main-app.component';
import { ForgetPasswordUserComponent } from './views/forget-password/forget-password.component';
import { ResetPasswordUserComponent } from './views/reset-password/reset-password.component';
import { CallBackComponent } from './views/call-back/call-back.component';
import { FacebookCallBackComponent } from './views/facebook-call-back/facebook-call-back.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { TermsComponent } from './views/terms/terms.component';
import { CreateUserAccountComponent } from './views/create-account/create-account.component';
import { ResetUserAccountComponent } from './views/setting/reset-account.component';
import { HomeComponent } from './views/home/home.component';
import { MobileVerificationComponent } from './views/mobile-verification/mobile-verification.component';
import { EmailVerificationComponent } from './views/email-verification/email-verification.component';
import { IdCardEmailVerificationComponent } from './views/idCardEmail-verification/idCardEmail-verification.component';
import { IdCardDetailComponent } from './views/idCard-details/idCard-details.component';
import { IdCardVerificationComponent } from './views/idCard-verification/idCard-verification.component';


const visitorRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'forget-password-user', component: ForgetPasswordUserComponent},
  { path: 'create-account-user', component: CreateUserAccountComponent},
  { path: 'reset-account-user', component: ResetUserAccountComponent},
  { path: 'mobile-verification/:id/:type', component: MobileVerificationComponent},
  { path: 'email-verification', component: EmailVerificationComponent},
  { path: 'idCardEmail-verification', component: IdCardEmailVerificationComponent},
  { path: 'reset-password', component: ResetPasswordUserComponent},
  { path: 'callBack', component: CallBackComponent},
  { path: 'Facebook-callBack', component: FacebookCallBackComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'idCard-details/:id', component: IdCardDetailComponent},
  { path: 'idCard-verification/:id', component: IdCardVerificationComponent},

];


// const routes: Routes = [

//   { path: '', redirectTo:'Main',pathMatch:'full'},
//   { path: 'Main', component: TemplateMainAppComponent, children: visitorRoutes },
// ];

@NgModule({
  imports: [RouterModule.forRoot(visitorRoutes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
