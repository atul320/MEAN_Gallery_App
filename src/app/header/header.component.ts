import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../apiservices/apicall.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private user: ApicallService, public router:Router) { }
  ngOnInit(): void { }
}
