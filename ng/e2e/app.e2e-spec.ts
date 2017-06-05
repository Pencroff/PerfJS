import { PerfJsPage } from './app.po';

describe('perf-js App', () => {
  let page: PerfJsPage;

  beforeEach(() => {
    page = new PerfJsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
