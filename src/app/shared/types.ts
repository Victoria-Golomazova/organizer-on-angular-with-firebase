import * as moment from 'moment';

export type Day = {
  value: moment.Moment,
  isActive: boolean,
  isDisabled: boolean,
  isSelected: boolean,
}

export type Week = {
  days: Day[]
}