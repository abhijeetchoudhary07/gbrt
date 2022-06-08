import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommanService } from '../comman.service';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss'],
})
export class FinalResultComponent implements OnInit {
  data: any = [];
  data2: any = [];

  constructor(private comman: CommanService, private router: Router,private sipnner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.sipnner.show()
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    let data = {
      token: localStorage.getItem('token'),
    };
    this.comman.finalResult(data, headers).subscribe((res: any) => {
      console.log(res);
      this.data.push(res.data);
      this.data2=res.data.answerSheet;
      console.log(res.data.answerSheet);
      this.sipnner.hide()
    });
  }
  close() {
    localStorage.removeItem('token');
    this.router.navigate(['/second']);
  }
}
