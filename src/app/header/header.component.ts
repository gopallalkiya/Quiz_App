import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public quiz: QuizService,
    private actRoute: ActivatedRoute) {
    let id = this.actRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {
  }
  logout() {
    this.authService.doLogout()
  }
}
