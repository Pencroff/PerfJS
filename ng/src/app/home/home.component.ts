import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const me = this;
    // private route: ActivatedRoute,
    // this.route.params
    //   .subscribe((params: Params) => {
    //     console.log('params', params);
    //   });

    // Support old links format
    me.router.events
      .filter(event => event instanceof RoutesRecognized )
      .subscribe((event: RoutesRecognized ) => {
        // You only receive NavigationStart events
        console.log('event', event);
        const url = event.url || '';
        if (url.indexOf('#!') > -1) {
          const redirectUrl = me.recognizeRedirectUrl(event.url);
          me.router.navigateByUrl(redirectUrl);
        }
      });
  }
  recognizeRedirectUrl(url) {
    const me = this;
    let result = '/';
    if (me.isSearchUrl(url)) {
      result = me.buildSearchUrl(url);
    } else if (me.isTagUrl(url)) {
      result = me.buildTagUrl(url);
    } else {
      result = me.buildIdUrl(url);
    }
    return result;
  }
  buildSearchUrl(url) {
    const partList = url.split('/');
    const result = `search/${_.last(partList)}`;
    console.log(partList);
    return result;
  }
  buildTagUrl(url) {
    const partList = url.split('/');
    const result = `tag/${_.last(partList)}`;
    console.log(partList);
    return result;
  }
  buildIdUrl(url) {
    const partList = url.split('/');
    const result = `test/${partList[2]}`;
    console.log(partList);
    return result;
  }
  isTagUrl(url) {
    const result = url.indexOf('#!/tag') > -1;
    return result;
  }
  isSearchUrl(url) {
    const result = url.indexOf('#!/search') > -1;
    return result;
  }
}
