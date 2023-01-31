import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';
import { Week } from '../shared/types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendar: Week[] = [];

  constructor(
    private _dateService: DateService,
  ) { }

  ngOnInit(): void {
    this._dateService.date.subscribe(this.generate.bind(this));
  }

  private generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day')

    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const isActive = moment().isSame(value, 'date');
            const isDisabled = !now.isSame(value, 'month');
            const isSelected = now.isSame(value, 'date');

            return {
              value, isActive, isDisabled, isSelected
            }
          })
      })
    }

    this.calendar = calendar;
  }

  public select(day: moment.Moment) {
    this._dateService.changeDate(day)
  }
}
