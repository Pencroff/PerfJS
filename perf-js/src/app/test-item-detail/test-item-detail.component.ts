import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-test-item-detail',
  templateUrl: './test-item-detail.component.html',
  styleUrls: ['./test-item-detail.component.scss']
})
export class TestItemDetailComponent implements OnInit {
  private guid: string;
  constructor( private loaderService: LoaderService,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    const me = this;
    me.route.params.subscribe((params) => {
      me.guid = params['guid'];
      me.loaderService.loadScript(me.guid)
        .then((viewData) => {
          console.log(viewData);
        });
    })
  }

  isTestSelected() {
    const result = !!window['test'];
    return result;
  }
}
