import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  host: {class: 'main-app'},
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Github search';
}
