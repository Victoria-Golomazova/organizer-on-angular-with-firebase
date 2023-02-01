import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';
import { DateService } from '../shared/date.service';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/types';

@UntilDestroy()
@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  public date = this._dateService.date;

  public form!: FormGroup;

  public tasks: Task[] = [];

  constructor(
    private _dateService: DateService,
    private _taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })

    this._dateService.date
      .pipe(
        untilDestroyed(this),
        switchMap((v) => this._taskService.load(v))
      )
      .subscribe((r) => {
        this.tasks = r;
      })
  }

  public onSubmit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this._dateService.date.value.format('DD-MM-YYYY'),
      id: ''
    }

    this._taskService.create(task)
      .pipe(untilDestroyed(this))
      .subscribe((r) => {
        this.form.reset();
        this.tasks.push({
          title: r.title,
          date: r.date,
          id: r.id,
        });
      })
  }

  public remove(task: Task) {
    this._taskService.remove(task)
      .subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id)
      })
  }
}
