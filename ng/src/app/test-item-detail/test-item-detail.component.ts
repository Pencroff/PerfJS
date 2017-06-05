import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Prism from 'prismjs';
import _ from 'lodash';

import { LoaderService } from '../loader.service';
import { IViewData, IViewDataCase } from './i-view-data.interface';

@Component({
  selector: 'app-test-item-detail',
  templateUrl: './test-item-detail.component.html',
  styleUrls: ['./test-item-detail.component.scss']
})
export class TestItemDetailComponent implements OnInit {
  private guid: string;
  public data: IViewData;
  public suite: any;
  public progressFlag: boolean;
  public fastestList: string[] = [];
  public slowestList: string[] = [];

  constructor( private loaderService: LoaderService,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    const me = this;
    me.route.params.subscribe((params) => {
      me.guid = params['guid'];
      me.loaderService
        .loadScript(me.guid)
        .then((data) => {
          const {viewData, suite} = data;
          me.data = viewData;
          me.suite = suite;
        });
    })
  }
  runSingle(event, id) {
    const me = this;
    let clone;
    let caseViewData;
    if (!me.progressFlag) {
      me.progressFlag = id;
      const suite = _.find(me.suite, { id });
      if (suite) {
        caseViewData = _.find(me.data.cases, { id });
        caseViewData.result = null;
        clone = suite.clone();
        const events = me.suite.events;
        _.forEach(events.start, (fn) => { clone.on('start', fn); });
        _.forEach(events.cycle, (fn) => {
          if (fn !== me.cycleHandler) {
            clone.on('cycle', fn)
          }
        });
        clone
          .on('complete', completeHandler)
          .run({ 'async': true });
      }
    }

    function completeHandler(e) {
      me.progressFlag = false;
      clone.off('start');
      clone.off('cycle');
      clone.off('complete');
      caseViewData.result = e.target.toString();
    }
  }
  runAll(event) {
    const me = this;
    if (me.suite && !me.progressFlag) {
      me.progressFlag = true;
      me.cleanResults();
      me.suite
        .on('cycle', (e) => me.cycleHandler(e))
        .on('complete', (e) => me.completeHandler(e))
        .run({ 'async': true });
    }
  }

  cycleHandler(event) {
    const me = this;
    const id = event.target.id;
    const data = _.find(me.data.cases, { id });
    if (data) {
      data.result = event.target.toString();
    }
  }
  completeHandler(event) {
    const me = this;
    me.progressFlag = false;
    me.fastestList = event.currentTarget.filter('fastest').map('id');
    me.slowestList = event.currentTarget.filter('slowest').map('id');

    console.log('Fastest is ' + event.currentTarget.filter('fastest').map('name'));
  }

  getResultModifiers(id) {
    const me = this;
    const result = {
      'app-test-item-detail__result--fastest': me.fastestList.indexOf(id) > -1,
      'app-test-item-detail__result--slowest': me.slowestList.indexOf(id) > -1,
    };
    return result;
  }
  getCaseResult(id) {
    const me = this;
    let result = '-';
    const data = _.find(me.data.cases, { id });
    if (data) {
      result = data.result || '-';
    }
    if ((me.progressFlag === true || me.progressFlag === id) && result === '-') {
      result = '<span class="gauge-loader"></span>';
    }
    return result;
  }

  isDisabled() {
    return !!this.progressFlag;
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

  private cleanResults() {
    const me = this;
    me.fastestList.length = 0;
    me.slowestList.length = 0;
    _.forEach(me.data.cases, (item) => {
      item.result = '-';
    })
  }
}
