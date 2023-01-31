import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  public date = this._dateService.date;
  
  constructor(
    private _dateService: DateService,
  ) {}

  public go(dir: number) {
    this._dateService.changeMonth(dir);
  }
}
