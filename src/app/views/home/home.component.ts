import { Component, OnInit } from '@angular/core';
import { UserAppSelectorService } from 'src/app/services/app-selector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected appSelectorService: UserAppSelectorService,) { }
  ngOnInit() {
   
  }
 

}
