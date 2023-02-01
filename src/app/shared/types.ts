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

export type Task = {
  title: string,
  id?: string,
  date?: string,
}

export interface CreateResponse {
  name: string
}