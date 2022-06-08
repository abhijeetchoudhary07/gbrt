import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from 'src/app/comman.service';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private comman: CommanService,private spinner:NgxSpinnerService, private toastr: ToastrService,private router:Router) {}
  typeSelected= 'ball-clip-rotate-multiple';
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9_-]{8,15}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'),
    ]),
    confirmpassword: new FormControl('', [Validators.required]),
  });
  keyPressNumbersDecimal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  submit() {
    
    this.spinner.show();
    let userData = {
      name: this.registerForm.get('firstName')?.value,
      email: this.registerForm.get('email')?.value,
      mobile: this.registerForm.get('mobileNumber')?.value,
      password: this.registerForm.get('password')?.value,
      cnfpassword: this.registerForm.get('confirmpassword')?.value,
    };
    this.comman.registerUser(userData).subscribe((res: any) => {
      if (res.status == true) {
        this.toastr.success(res.message);
this.router.navigate(['/login'])
this.spinner.hide()
      } else if (res.status == false){
        this.toastr.error(res.message);
this.spinner.hide()}
    });
// this.spinner.hide()

  }

  submit1(){
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {}
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get newpassword() {
    return this.registerForm.get('newPassword');
  }

  get confirmpassword() {
    return this.registerForm.get('confirmpassword');
  }
}
