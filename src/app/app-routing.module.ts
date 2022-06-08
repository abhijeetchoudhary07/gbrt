import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './exam/home/home.component';
import { QuestionstatusComponent } from './exam/questionstatus/questionstatus.component';
import { FinalResultComponent } from './final-result/final-result.component';
import { SecondaryComponent } from './secondary/secondary.component';

import { LoginComponent } from './user-verification/login/login.component';
import { RegisterComponent } from './user-verification/register/register.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
 
  {path:'home',component:HomeComponent,
   canActivate:[AuthGuard]
  },
  {path:'second',component:SecondaryComponent},
{
  path :'final',component:FinalResultComponent
},
  {
    path:'questionStatus',component:QuestionstatusComponent
  },
  {path:'**',redirectTo:'register',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
