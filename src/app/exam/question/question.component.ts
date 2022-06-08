import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommanService } from 'src/app/comman.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  arr: any;
  ele: any;
  arr2: any;
  headers: any;
  condition: any = null;
  condition1: any = '';
  newquestionArr1: any = [];
  newquestionArr2: any = [];
  questionNumber: any = [];
  constructor(
    private comman: CommanService,
    private detect: ChangeDetectorRef
  ) {}

  questionArray: any[] = [];
  newarr: any;
  newquestionArray: any[] = [];

  questionForm = new FormGroup({
    questionNumber: new FormControl(''),
    option: new FormControl(''),
  });

  ngOnInit(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    this.comman.getQuestion(headers).subscribe((res: any) => {
      this.newquestionArr1 = res.data;
      for (let i = 0; i < this.newquestionArr1.length; i++) {
        this.newquestionArr1[i].answerType = 1;
        this.newquestionArr1[i].answerType1 = 1;
        this.newquestionArr1[i].answerType2 = 1;
      }
      this.newquestionArr2 = this.newquestionArr1;
      this.comman.newquestionArr1 = this.newquestionArr2;
      this.questionArray.push(res.data);
      this.newquestionArray = [this.questionArray[0][0]];
      // console.log(this.newquestionArr2);
    });
  }

  save(ele: any) {
    this.arr2 = this.questionForm.get('option')?.value;

    if (this.condition !== this.questionForm.get('option')?.value) {
      this.detect.detectChanges();
      this.questionNumber = this.newquestionArr2[ele.qn];
      this.comman.newquestionArr1[ele.qn - 1].answerType1 = '7';
      console.log(this.comman.newquestionArr1, 'hiiii');
    } else {
      this.detect.detectChanges();
      this.questionNumber = this.newquestionArr2[ele.qn];
      this.comman.newquestionArr1[ele.qn - 1].answerType = '2';
      console.log(this.comman.newquestionArr1, 'byyyy');
    }
    if (this.condition1 == this.questionForm.get('option')?.value) {
      this.detect.detectChanges();
      this.questionNumber = this.newquestionArr2[ele.qn];
      this.comman.newquestionArr1[ele.qn - 1].answerType1 = '1';
      console.log(this.comman.newquestionArr1, 'hiiii');
    }
  }

  nextQuestion(ele1: any) {
    var ind = this.questionArray[0].findIndex((x: any) => {
      this.ele = x;
      return x.question == ele1.question;
    });

    if (ind < 19) {
      this.newarr = ind;
      console.log(ind++);
      this.newquestionArray = [this.questionArray[0][ind++]];
    }
  }
  saveAnswer(ele1: any) {
    var ind = this.questionArray[0].findIndex((x: any) => {
      this.ele = x;
console.log(x.question);

      return x.question == ele1.question;
    });

    this.arr2 = this.questionForm.get('option')?.value;
    this.arr = this.ele._id;

    if (this.arr2 !== null) {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      );
      var option = this.arr2.slice(-1);
      this.arr2 = this.arr2.slice(0, this.arr2.length - 1);

      let data = {
        questionId: this.arr,
        answerSelected: this.arr2,
        answerStatus: 'save&next',
        optionNo: option,
      };
      this.questionForm.reset();
      this.arr2 = this.questionForm.get('option')?.value;

      this.comman.saveAnswer(data, headers).subscribe((res: any) => {});
    } else {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      );

      let data = {
        questionId: this.arr,
        answerSelected: '',
        answerStatus: 'mark&next',
        optionNo: '',
      };
      this.comman.saveAnswer(data, headers).subscribe((res: any) => {});
    }
  }

  perviousQuestion(ele: any) {
    var index = this.questionArray[0].findIndex((x: any) => {
      return x.question == ele.question;
    });
    if (index > 0) {
      console.log(index--);
      this.newquestionArray = [this.questionArray[0][index--]];
    }
  }

  markedQuestion(ele1: any) {
    var ind = this.questionArray[0].findIndex((x: any) => {
      this.ele = x;

      return x.question == ele1.question;
    });
    if (ind < 19) {
      this.newarr = ind;
      console.log(this.newarr++);
      this.newquestionArray = [this.questionArray[0][this.newarr++]];
    }

    this.arr2 = this.questionForm.get('option')?.value;
    this.arr = this.ele._id;
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    let data = {
      questionId: this.arr,
      answerSelected: '',
      answerStatus: 'mark&next',
      optionNo: '',
    };
    this.comman.saveAnswer(data, headers).subscribe((res: any) => {});
    this.detect.detectChanges();
    this.questionNumber = this.newquestionArr2[ele1.qn];
    this.comman.newquestionArr1[ele1.qn - 1].answerType2 = '5';
  }
  resetOptions() {
    this.questionForm.reset();
  }
}
