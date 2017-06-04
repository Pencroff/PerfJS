import { Injectable } from '@angular/core';

import _ from 'lodash';
import scriptjs from 'scriptjs';
import Benchmark from 'benchmark';
import platform from 'platform';

import data from '../data/index';
import { promise } from 'selenium-webdriver';

@Injectable()
export class LoaderService {

  constructor() { }

  loadScript(id): Promise<object> {
    const me = this;
    const scriptData = _.find(data, { id });
    me.removeScriptFromHead();
    return new Promise((resolve, reject) => {
      if (!scriptData) {
        reject(new Error(`No script data for id: ${id}`));
      }
      scriptjs(`data/${scriptData.url}?v=${Date.now()}`, function () {
        console.log('test', window['test']);
        const test = window['test'];
        const suite = new Benchmark.Suite;
        const testFillResult = test.fill(suite);
        let promise;
        if (_.isPromise(testFillResult)) {
          promise = testFillResult.then((suiteItem) => me.transformSuiteToViewData(suiteItem, test));
        } else {
          promise = me.transformSuiteToViewData(suite, test);
        }
        resolve(promise);
      });
    });
  }

  private transformSuiteToViewData(suite, test) {
    const me = this;
    const result = {
      id: test.id,
      kebabName: _.kebabCase(test.name),
      name: test.name,
      platform: platform.description,
      source: test.fill.toString(),
      cases: [],
    };
    result.cases = _.map(suite, (benchmark) => ({
        id: benchmark.id,
        name: benchmark.name,
        source: me.getFunctionSource(benchmark.fn.toString()),
      }));
    return result;
  }
  private getFunctionSource(str) {
    const firstIndex = str.indexOf('{');
    const lastIndex = str.lastIndexOf('}');
    const result = str.substring(firstIndex + 1, lastIndex);
    return result;
  }
  private removeScriptFromHead() {
    const head = document.getElementsByTagName('head')[0];
    const list = head.getElementsByTagName('script');
    _.forEach(list, (el) => {
      if (el && el.parent) {
        el.parent.removeChild(el);
      }
    });
  }
}
