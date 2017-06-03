import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-item-detail',
  templateUrl: './test-item-detail.component.html',
  styleUrls: ['./test-item-detail.component.scss']
})
export class TestItemDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isTestSelected() {
    const result = !!window['test'];
    return result;
  }
}
