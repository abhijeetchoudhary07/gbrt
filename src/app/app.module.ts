import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FinalResultComponent } from './final-result/final-result.component';
import { HomeComponent } from './exam/home/home.component';
import { QuestionComponent } from './exam/question/question.component';
import { QuestionstatusComponent } from './exam/questionstatus/questionstatus.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { QuestionComponent } from './exam/question/question.component';
import { CountdownModule } from 'ngx-countdown';
import { SecondaryComponent } from './secondary/secondary.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './user-verification/login/login.component';
import { RegisterComponent } from './user-verification/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    FinalResultComponent,
    LoginComponent,
    RegisterComponent,
    QuestionComponent,
    QuestionstatusComponent,
    HomeComponent,
    SecondaryComponent,

    // QuestionComponent
  ],
  imports: [
    BrowserModule,
    CountdownModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
