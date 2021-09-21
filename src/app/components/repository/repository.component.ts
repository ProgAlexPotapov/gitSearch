import {Component, OnDestroy, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {RepositorySearchData, RepositorySearchItem} from "../../models/models";
import {EMPTY, fromEvent, Subject} from "rxjs";
import {ajax} from "rxjs/ajax";
import {
  catchError, debounceTime, distinctUntilChanged,
  filter, map, switchMap, takeUntil, tap
} from "rxjs/operators";
import {getValidationMessage, InputPattern} from "../../lib/lib";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RepositoryComponent implements AfterViewInit, OnDestroy {

  @ViewChild('input', {static: false}) input: ElementRef;

  private destroyed$ = new Subject<void>();

  quickFormState = false;
  isDataReady = false;
  search = new FormControl(
    '',
    [Validators.required, Validators.maxLength(15)],
  );

  searchUrl = 'https://api.github.com/search/repositories?q=';
  searchResults: RepositorySearchData;
  selectedItem: RepositorySearchItem;
  selectedItemIdx: number;

  constructor() {
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'input')
      .pipe(
        takeUntil(this.destroyed$),
        map(e => e.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => this.isDataReady = true),
        filter(value => value.trim()),
        switchMap(value => ajax.getJSON(this.searchUrl + value).pipe(
          catchError(() => EMPTY)
        ))
      )
      .subscribe((res: any) => {
        if (res) {
          this.searchResults = res;
          this.isDataReady = false;
        }
      });
  }

  errorMessage() {
    return getValidationMessage(this.search);
  }

  closeQuickForm(state: boolean) {
    this.quickFormState = state;
  }

  allowableChar(event: any) {
    const symbol = event.key;
    return !!symbol.match(InputPattern.Letters);
  }

  selectRepository(event: any, idx: number) {
    if (this.selectedItemIdx !== idx) {
      this.selectedItemIdx = idx;
      this.quickFormState = true;
      this.selectedItem = this.searchResults.items[idx];
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
