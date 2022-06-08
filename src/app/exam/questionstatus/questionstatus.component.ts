import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from 'src/app/comman.service';


@Component({
  selector: 'app-questionstatus',
  templateUrl: './questionstatus.component.html',
  styleUrls: ['./questionstatus.component.scss']
})
export class QuestionstatusComponent implements OnInit ,AfterViewInit{

  Attempted: any;
  notAttempted: any;
  answerArray: any;
  qns: any=[]
  interval: any;
  timeLeft: number= 1200;
  constructor(private sipnner:NgxSpinnerService,private comman:CommanService,private router:Router,private toastr:ToastrService) { }
question:any =[]
  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        const headers = new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        );
      let data = {
        token :localStorage.getItem('token')
      }
      this.comman.submitOption(data,headers).subscribe((res:any)=>{
        
      })
      this.router.navigate(['/final'])
      // localStorage.removeItem('token')
      }
      // this.toastr.success('Your paper submitted')

    }, 1000);
  }
  
 

  ngAfterViewInit(){
    setTimeout(()=>{ 
      this.qns = this.comman.newquestionArr1
     }, 2000)
     }

answer(){

  this.sipnner.show()

  const headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );
let data = {
  token :localStorage.getItem('token')
}

  this.comman.answerReview(data ,headers).subscribe((res: any) => {
   this.Attempted = res.data.totalAttempt;
   this.notAttempted = res.data.notAttempt;
   this.answerArray = res.data.answersheet;
console.log(res.data.answersheet);

   this.sipnner.hide()});

}
submit(){
  const headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );
let data = {
  token :localStorage.getItem('token')
}
this.comman.submitOption(data,headers).subscribe((res:any)=>{
  
})
this.router.navigate(['/final'])
// localStorage.removeItem('token')
this.toastr.success('Your paper submitted')

}
 
}
