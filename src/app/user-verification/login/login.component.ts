import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from 'src/app/comman.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private comman:CommanService,private spinner:NgxSpinnerService, private toastr:ToastrService,private router:Router) {}
  loginForm = new FormGroup({
    loginemail: new FormControl('', [Validators.required, Validators.email]),
    loginpassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'),
    ]),
  });
  userData(){
    this.spinner.show();
    let data = {
      email : this.loginForm.get('loginemail')?.value,
      password : this.loginForm.get('loginpassword')?.value,
    }
    this.comman.loginUser(data).subscribe((res:any)=>{
      console.log(res);
      
      if (res.status == true) {
        this.toastr.success(res.message);
        this.spinner.hide()
        this.router.navigate(['/second'])
      } else if(res.status !== true){
        this.toastr.error(res.message);
        this.spinner.hide()
      }
      localStorage.setItem('token' , res.data.token)
    })

  }
  ngOnInit(): void {}
  signin(){
    this.router.navigate(['/register'])
  }
  get loginemail1() {
    return this.loginForm.get('loginemail');
  }

  get loginpassword1() {
    return this.loginForm.get('loginpassword');
  }
}
