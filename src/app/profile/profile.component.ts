import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Object = {};

  constructor(public quiz: QuizService) { }

  ngOnInit() {
    this.getUserDetails()
  }
  getUserDetails() {
    this.quiz.getUser().subscribe(
      (res) => {
        console.log(res)
        this.currentUser = res
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
