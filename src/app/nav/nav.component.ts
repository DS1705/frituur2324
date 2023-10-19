import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public httpService:HttpService,public authService:AuthService) { }

  ngOnInit(): void {
    this.httpService.getCategories();
  }

}
