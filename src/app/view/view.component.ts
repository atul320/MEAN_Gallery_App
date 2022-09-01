import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apiservices/apicall.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent{

  public search: any = '';
  public query: any;
  api?: any[];
  imagetime: any;

  constructor(private user: ApicallService) {
    this.user.get_image().subscribe(result => {
      this.api = result;
      console.log(result);
    });
  }
  

  
}
