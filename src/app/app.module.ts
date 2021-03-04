import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateMainAppComponent } from './template/template-main-app/template-main-app.component';

import { HomeComponent } from './views/home/home.component';
import { LoginUserComponent } from './views/login/login.component';
import { ForgetPasswordUserComponent } from './views/forget-password/forget-password.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './services/main.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuards } from './guards';
import { AlertService } from './services/alert.service';
import { UserAppSelectorService, } from './services/app-selector.service';
import { UtilService } from './services/util.service';
import { AuthVisitorService } from './services/auth-visitor.service';
import { CoreModule } from './core/core.module';
import { CreateUserAccountComponent } from './views/create-account/create-account.component';
import { IdCardDetailComponent } from './views/idCard-details/idCard-details.component';
import { MobileVerificationComponent } from './views/mobile-verification/mobile-verification.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { EmailVerificationComponent } from './views/email-verification/email-verification.component';
import { ResetPasswordUserComponent } from './views/reset-password/reset-password.component';
import { IdCardVerificationComponent } from './views/idCard-verification/idCard-verification.component';
import { IdCardEmailVerificationComponent } from './views/idCardEmail-verification/idCardEmail-verification.component';
import { ResetUserAccountComponent } from './views/setting/reset-account.component';
import { FacebookCallBackComponent } from './views/facebook-call-back/facebook-call-back.component';
import { CallBackComponent } from './views/call-back/call-back.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { TermsComponent } from './views/terms/terms.component';

// const googleLoginOptions = {
//   "client_secret":"2ZXXeT7_r-jZ9wNaYxrgNej9"
// };

@NgModule({
  declarations: [
    AppComponent,
    TemplateMainAppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginUserComponent,
    ForgetPasswordUserComponent,
    CreateUserAccountComponent,
    MobileVerificationComponent,
    EmailVerificationComponent,
    ResetPasswordUserComponent,
    IdCardDetailComponent,
    IdCardVerificationComponent,
    IdCardEmailVerificationComponent,
    ResetUserAccountComponent,
    CallBackComponent,
    FacebookCallBackComponent,
    PrivacyComponent,
    TermsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SocialLoginModule,
   

  ],
  providers: [
    MainService,
    AuthVisitorService,
    UtilService,
    AlertService,
    AuthGuards,
    UserAppSelectorService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '824042235042-qkdrs2pbntrbiplpsbce9teegqsnmkvb.apps.googleusercontent.com'
              // '709004211872-26ubf9fh1sdokrt3i4l178d85s7fo8kl.apps.googleusercontent.com'
            )
            
          },
        
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('724953911540502')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],

  entryComponents:
    [
      LoginUserComponent
    ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
