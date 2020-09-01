import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  MyDataSource: any;
  displayedColumns = ['quiz_id', 'total_questions', 'total_correct', 'result'];


  constructor(public quiz: QuizService) { }

  ngOnInit() {
    this.quiz.getResult().subscribe(
      (res) => {
        console.log(res);
        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res;

      }, (error) => {
        console.log(error);
      }
    )
  }

}
