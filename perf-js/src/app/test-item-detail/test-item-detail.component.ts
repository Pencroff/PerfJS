import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Prism from 'prismjs';

import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-test-item-detail',
  templateUrl: './test-item-detail.component.html',
  styleUrls: ['./test-item-detail.component.scss']
})
export class TestItemDetailComponent implements OnInit {
  private guid: string;
  public data: object;
  constructor( private loaderService: LoaderService,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    const me = this;
    me.route.params.subscribe((params) => {
      me.guid = params['guid'];
      me.loaderService
        .loadScript(me.guid)
        .then((viewData) => {
          console.log(viewData);
          me.data = viewData;
        });
    })
  }

  isTestSelected() {
    const me = this;
    const result = !!window['test'] && me.data;
    return result;
  }
  highlightSource(v) {
    const result = Prism.highlight(v, Prism.languages.javascript);
    return result;
  }
}
