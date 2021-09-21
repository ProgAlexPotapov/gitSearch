import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.less'],
  host: { class: 'main-header' },
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  ngOnInit() {
  }
}
