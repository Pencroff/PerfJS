import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.scss']
})
export class TestItemComponent implements OnInit {
  @Input() data: object;

  private guid: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    // console.log('list', parentRoute.events);
    // parentRoute.events
    //   .filter(event => event instanceof RoutesRecognized )
    //   .subscribe((event: RoutesRecognized ) => {
    //     // You only receive NavigationStart events
    //     console.log('event', event);
    //   });
  }

  ngOnInit() {
    const me = this;
    me.route.params.subscribe((params) => {
      me.guid = params.guid;
    })
  }

  onClickTag(event, tag) {
    const me = this;
    me.router.navigateByUrl(`tag/${tag}`);
    event.stopPropagation();
  }

  onSelect(event, data) {
    const me = this;
    if (event.target.tagName === 'a') {
      event.stopPropagation();
    } else {
      me.router.navigateByUrl(`test/${data.id}`);
    }
  }
  isActive() {
    const me = this;
    const result = me.guid === me.data['id'];
    return result;
  }
}
