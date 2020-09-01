import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export interface UsersData {
  question: string;
  _id: string;
  options: any[]
}



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  queForm: FormGroup;

  action: string;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, private fb: FormBuilder, private quiz: QuizService) {
    console.log(data);
    this.local_data = { ...data };
    console.log(this.local_data.options, 'this.local_data')
    this.action = this.local_data.action;
    this.questionForm()
  }


  questionForm() {
    this.queForm = this.fb.group({
      _id: this.local_data._id,
      question: this.local_data.question,
      options: this.fb.array([]),
      answer: this.local_data.answer,
    })
    const control = <FormArray>this.queForm.get('options');
    for (let option of this.local_data.options)
      control.push(this.fb.control(option));
    console.log(this.queForm, 'questionForm()');
  }


  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
    this.quiz.updatequestions(this.queForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Update Successfully',
          icon: 'success'
        })
      }, (error) => {
        Swal.fire({
          title: 'Error',
          icon: 'error'
        })
      }
    )
  }

  addElement() {
    const control = <FormArray>this.queForm.get('options');
    // push the value from stepTextArea to array
    control.push(this.fb.control(""));
    console.log(control);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
  }

}
