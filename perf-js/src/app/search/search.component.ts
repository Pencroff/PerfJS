import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searchText: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const me = this;
    me.route.params
      .subscribe((params: Params) => {
        if (params.tag) {
          me.searchText = `tag:${params.tag}`
        }
      });
  }

}
