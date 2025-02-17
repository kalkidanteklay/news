import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsListComponent} from '../app/components/news-list/news-list.component';


@Component({
  selector: 'app-root',
  imports: [NewsListComponent],
  template: `
    <app-news-list></app-news-list>
  `
  
})
export class AppComponent {
  title = 'news';
}
