import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appear-quiz',
  templateUrl: './appear-quiz.component.html',
  styleUrls: ['./appear-quiz.component.css']
})
export class AppearQuizComponent implements OnInit {

  quiz_id: "";
  Quizes: any = [];
  Question: any = [];
  SubmitForm: FormGroup;
  constructor(public quiz: QuizService, public fb: FormBuilder, public router: Router) { }

  quizIdform = this.fb.group({
    quiz_id: ['']
  })

  createSubmitForm() {

    this.SubmitForm = this.fb.group({
      quiz_id: new FormControl(),
      questions: this.fb.array([])
    })


  }

  onsubmit() {
    console.log(this.SubmitForm.value, 'SubmitForms')
    this.quiz.submitQuiz(this.SubmitForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Quiz Submit Successfully',
          icon: 'success'
        })
        this.router.navigate(['result']);
        console.log(res, 'quiz submit res');
      }, (error) => {
        Swal.fire({
          title: 'Something went wrong',
          icon: 'error'
        })
        console.log(error);
      }
    )
  }

  setFormValues(res) {
    this.SubmitForm.get('quiz_id').setValue(this.quiz_id);
    const control = <FormArray>this.SubmitForm.get('questions');
    let questions = res;
    for (let i = 0; i < questions.length; i++) {
      control.push(this.fb.group({
        _id: [questions[i]._id],
        question: [questions[i].question],
        options: [questions[i].options],
        media: this.fb.group({
          type: questions[i].media.type,
          link: questions[i].media.link
        }),
        answer: [""]
      }));
    }
    console.log(this.SubmitForm);
  }

  changeQuiz(e) {
    this.quizIdform.get('quiz_id').setValue(e.target.value, {
      onlySelf: true
    })
  }

  GetQuizById() {
    console.log(this.quizIdform.value.quiz_id.quiz_id, 'this.quizIdform.value')
    this.quiz_id = this.quizIdform.value.quiz_id.quiz_id;
    let params = new HttpParams().set("quiz_id", this.quiz_id).set("editMode", 'false');
    this.quiz.getQuestionByid(params).subscribe(
      (res) => {
        this.Question = res
        this.setFormValues(res);

        console.log(this.Question, 'res from getQuestionById')
      }, (error) => {
        console.log(error)
      }
    )
  }


  ngOnInit() {
    this.getAllQuizes();
    this.createSubmitForm();
  }
  getAllQuizes() {
    this.quiz.getAllquiz().subscribe(
      (res) => {
        this.Quizes = res
        console.log(this.Quizes, 'res')
      }, (error) => {

      }
    )
  }
}
