import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {RepositorySearchItem} from "../../../models/models";

@Component({
  selector: 'app-quick-form',
  templateUrl: 'quick-form.html',
  host: { class: 'layoutPanel panelResizable west' },
  encapsulation: ViewEncapsulation.None,
})

export class QuickFormComponent implements OnInit {
  @Input() repositoryItem: RepositorySearchItem;
  @Output() flagQuickForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeQuickForm() {
    this.flagQuickForm.emit(false);
  }

  ngOnInit() {
  }
}
