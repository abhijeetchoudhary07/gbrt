import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommanService {
  constructor(private http: HttpClient) {}
  questionNumber: any = [];
  options:any = [];
  newquestionArr1:any = []
  registerUser(data: any) {
    let url = `https://lit-harbor-43284.herokuapp.com/signup`;
    return this.http.post(url, data);
  }

  loginUser(data: any) {
    let url = `https://lit-harbor-43284.herokuapp.com/signin`;
    return this.http.post(url, data);
  }

  getQuestion(token1: any) {
    let url = `https://lit-harbor-43284.herokuapp.com/getQuestions`;
    return this.http.get(url, { headers: token1 });
  }

  saveAnswer(data: any, token: any) {
    let url = `https://lit-harbor-43284.herokuapp.com/saveanswer`;
    return this.http.post(url, data, { headers: token });
  }

  answerReview(data: any, token: any){
    let url = `https://lit-harbor-43284.herokuapp.com/reviewAnswerSheet`;
    return this.http.post(url, data,{ headers : token })
  }

  submitOption(data: any, token: any){
    let url = `https://lit-harbor-43284.herokuapp.com/finalSubmit`;
    return this.http.post(url, data,{ headers : token })

  }
  finalResult(data: any, token: any){
    let url =`https://lit-harbor-43284.herokuapp.com/scoreCard`
    return this.http.post(url, data,{ headers : token })

  }
}
