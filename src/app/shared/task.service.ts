import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { CreateResponse, Task } from "./types";
import { map, Observable } from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static url = 'https://angular-organizer-b79b5-default-rtdb.firebaseio.com/tasks'

  constructor(
    private _http: HttpClient,
  ) {}

  public load(date: moment.Moment):Observable<Task[]> {
    return this._http
      .get(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map((res: {[key: string]: any}) => {
        if (!res) {
          return []
        }

        return Object.keys(res).map((key: string) => ({...res[key], id: key}))
      }))
  }

  public create(task: Task): Observable<Task> {
    return this._http
      .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map((res) => {
        return {...task, id: res.name}
      }))
  }

  public remove(task: Task): Observable<void> {
    return this._http
      .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}