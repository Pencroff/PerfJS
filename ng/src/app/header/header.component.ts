import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Could be improved:
 * - saving selected lang to local-storage
 * - matching langauges from `translate`, instead of hardcoding, like `translate.getLangs()`
 * - providing list of languages as attribute value from top level
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: object[];

  constructor(private translate: TranslateService) {
    const langArr = [];
    langArr.push({id: 'en', name: 'English'});
    langArr.push({id: 'uk', name: 'Ukrainian'});
    this.languages = langArr;
  }

  ngOnInit() {
  }

  changeLanguage(langSelect) {
    this.translate.use(langSelect);
  }
  isSelected(lang) {
    const me = this;
    const result = lang === me.translate.currentLang;
    return result;
  }
}
