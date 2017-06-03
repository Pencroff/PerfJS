import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params
    //   .subscribe((params: Params) => {
    //     console.log('params', params);
    //   });
  }

}
