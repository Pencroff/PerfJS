import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import _ from 'lodash';

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
  constructor(private route: ActivatedRoute) {
    const me = this;
    me.dataArr = data;
  }

  ngOnInit() {
    const me = this;
    me.route.params
      .subscribe((params: Params) => {
        const tag = params['tag'];
        const q = params['q'];
        if (tag) {
          me.dataArr = _.filter(data, (item) => item.tags.indexOf(tag) > -1);
        } else if (q) {
          me.dataArr = _.filter(data, (item) => {
            const qStr = q.toLowerCase();
            const nameStr = item.name.toLowerCase() || '';
            const descStr = item.description.toLowerCase() || '';
            const result = nameStr.indexOf(qStr) > -1 || descStr.indexOf(qStr) > -1;
            return result;
          });
        } else {
          me.dataArr = data;
        }
      });
  }

}
