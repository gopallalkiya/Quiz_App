import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  angForm: FormGroup;
  queForm: FormGroup;
  btnDisabled = true;
  Q_id: number;
  imageURL: string;
  constructor(private fb: FormBuilder, private quiz: QuizService, public router: Router) {
    this.createForm();
    this.questionForm();

  }


  addElement() {
    const control = <FormArray>this.queForm.get('options');
    // push the value from stepTextArea to array
    control.push(this.fb.control(""));
    console.log(control);
  }
  createForm() {
    this.angForm = this.fb.group({
      quiz_id: ['', Validators.required],
      title: ['', Validators.required],
      passing_percentage: ['', Validators.required]
    });
  }

  questionForm() {
    this.queForm = this.fb.group({
      quiz_id: new FormControl(this.Q_id),
      question: [''],
      options: this.fb.array([]),
      answer: [''],
      image: [],
    })
    console.log(this.queForm);
  }
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.queForm.patchValue({
      image: file
    });
    this.queForm.get('image').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  homenavigate() {
    this.router.navigate(['profile']);
  }

  AddQuiz() {
    this.quiz.createQuiz(this.angForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Quiz Successfully Created',
          icon: 'success'
        })
        console.log('Quiz successfully created!')
        this.Q_id = res.quiz_id
        this.questionForm();
        this.btnDisabled = false;
      }, (error) => {
        Swal.fire({
          title: 'Error, Something Went Wrong',
          icon: 'error'
        })
        console.log(error);
      });
  }



  createQuestion() {
    console.log(this.queForm.value, 'qufsdfdf')
    this.quiz.createQuestion(this.queForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Question Added Successfully',
          icon: 'success'
        })
        console.log('Question Addedd successfully created!')

        this.queForm.reset()
        this.questionForm();
      }, (error) => {
        Swal.fire({
          title: 'Error, Try Again',
          icon: 'error'
        }, 'Please, Select Correct Answer from Options')
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
