import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  QuizbaseUri = 'http://localhost:3000/api/quiz';
  UserbaseUri = 'http://localhost:3000/api/users';
  QuestionbaseUri = 'http://localhost:3000/api/questions';
  ResultbaseUri = 'http://localhost:3000/api/results';


  constructor(private http: HttpClient) { }


  createQuiz(data): Observable<any> {
    let url = `${this.QuizbaseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    // console.log("Formvalue :  ", formValue)
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (Array.isArray(value)) {
        value.forEach(val => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
    }
    console.log(formData);
    return formData;
  }

  createQuestion(data): Observable<any> {
    let url = `${this.QuestionbaseUri}/add`;
    return this.http.post(url, this.toFormData(data))
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getAllquiz() {
    let url = `${this.QuizbaseUri}/getAllQuizzes`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getQuestionByid(params) {
    let url = `${this.QuestionbaseUri}/getAllQuestions`;
    return this.http.get(url, { params: params }).
      pipe(
        catchError(this.errorMgmt)
      )
  }

  getQuestionByidwithAnswer(params) {
    let url = `${this.QuestionbaseUri}/getAllQuestions`;
    return this.http.get(url, { params: params }).
      pipe(
        catchError(this.errorMgmt)
      )
  }

  updatequestions(data): Observable<any> {
    let url = `${this.QuestionbaseUri}/edit`;
    return this.http.put(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  submitQuiz(data): Observable<any> {
    let url = `${this.QuizbaseUri}/submit`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getResult() {
    let url = `${this.ResultbaseUri}/getMyResults`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  getUser() {
    let url = `${this.UserbaseUri}/getUserDetails`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
