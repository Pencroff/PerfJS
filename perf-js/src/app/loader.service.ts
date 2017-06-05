import { Injectable } from '@angular/core';

import _ from 'lodash';
import scriptjs from 'scriptjs';
import Promise from 'bluebird';

import data from '../data/index';

const Benchmark = window['Benchmark'];
const platform = window['platform'];

@Injectable()
export class LoaderService {

  constructor() { }

  loadScript(id): Promise<object> {
    const me = this;
    const scriptData = _.find(data, { id });
    me.removeScriptFromHead();
    return new Promise((resolve) => {
      if (!scriptData) {
        resolve(null);
      }
      scriptjs(`data/${scriptData.url}?v=${Date.now()}`, () => {
        const test = window['test'];
        const suite = new Benchmark.Suite;
        const testFillResult = test.fill(suite);
        let promise;
        if (me.isPromise(testFillResult)) {
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
  private isPromise(v) {
    let result = false;
    if ((_.isObject(v) || _.isFunction(v)) && _.isFunction(v.then)) {
      result = true;
    }
    return result;
  }
}
