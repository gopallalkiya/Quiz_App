import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  MyDataSource: any;
  displayedColumns = ['_id', 'question', 'action'];
  quiz_id: "";
  Question: any = [];
  Quizes: any = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(public quiz: QuizService, public fb: FormBuilder, public dialog: MatDialog) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '1000px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {

      }
    });
  }

  // updateRowData(row_obj) {
  //   this.MyDataSource = this.MyDataSource.filter((value, key) => {
  //     if (value.id == row_obj.id) {
  //       value.question = row_obj.question;
  //       // value.options = row_obj.options;
  //     }
  //     return true;
  //   });
  // }

  quizIdform = this.fb.group({
    quiz_id: ['']
  })

  ngOnInit() {
    this.getAllQuizes();
  }



  changeQuiz(e) {
    this.quizIdform.get('quiz_id').setValue(e.target.value, {
      onlySelf: true
    })
  }

  GetQuizById() {
    console.log(this.quizIdform.value.quiz_id.quiz_id, 'this.quizIdform.value')
    this.quiz_id = this.quizIdform.value.quiz_id.quiz_id;
    let params = new HttpParams().set("quiz_id", this.quiz_id).set("editMode", 'true');
    this.quiz.getQuestionByidwithAnswer(params).subscribe(
      (res) => {
        this.Question = res
        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res;

        console.log(this.MyDataSource.data, 'Table Response')
      }, (error) => {
        console.log(error)
      }
    )
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
