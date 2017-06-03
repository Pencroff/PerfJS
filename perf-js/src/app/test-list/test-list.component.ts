import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';

import data from '../../data/index';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  private dataArr: object[];
  constructor(private router: Router,
              private route: ActivatedRoute) {
    const me = this;
    me.dataArr = data;
    console.log('list', router.events);
    router.events
      .filter(event => event instanceof RoutesRecognized )
      .subscribe((event: RoutesRecognized) => {
        // You only receive NavigationStart events
        console.log('event', event);
      });
    // route.params.subscribe((params) => console.log('params', params));
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        console.log('params', params);
      });
  }

}
