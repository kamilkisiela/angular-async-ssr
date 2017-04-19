import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { toPromise } from 'rxjs/operator/toPromise';
import { from } from 'rxjs/observable/from';

export type HttpOrFetch = 'http' | 'fetch';

@Injectable()
export class Api {
  constructor(
    private http:Http
  ) {}

  check(httpOrFetch: HttpOrFetch): Observable<boolean> {
    return this.toObservable<boolean>(this.fetch(httpOrFetch));
  }

  private fetch(httpOrFetch: HttpOrFetch): Promise<boolean> {
    const url = 'http://localhost:4200/check';
    
    if (httpOrFetch === 'http') {
      return toPromise.call(this.http.get(url)).then(() => Promise.resolve(true));
    } else {
      return fetch(url).then(() => Promise.resolve(true));
    }
  }

  private toObservable<T>(promise: Promise<T>): Observable<T> {
    return turnIntoMacrotask<T>(from<T>(promise), 'toObservable');
  }
}

function turnIntoMacrotask<T>(source: Observable<T>, taskName: string): Observable<T> {
  const obs = new Observable<T>((observer) => {
    const zone = global['Zone'];
    let task: any = null;
    let scheduled: boolean = false;
    let sub: Subscription = null;
    let savedResult: any = null;
    let savedError: any = null;

      
    const scheduleTask = (_task: any) => {
      task = _task;
      scheduled = true;

      sub = source.subscribe(
        (res) => savedResult = res,
        (err) => {
          if (!scheduled) {
            throw new Error('invoke twice');
          }
          savedError = err;
          scheduled = false;
          task.invoke();
        },
        () => {
          if (!scheduled) {
            throw new Error('invoke twice');
          }
          scheduled = false;
          task.invoke();
        });
    };
    
    const cancelTask = (_task: any) => {
      if (!scheduled) {
        return;
      }
      scheduled = false;

      if (sub) {
        sub.unsubscribe();
        sub = null;
      }
    };

    const onComplete = () => {
      if (savedError !== null) {
        observer.error(savedError);
      } else {
        observer.next(savedResult);
        observer.complete();
      }
    };
      
    const _task = zone.current.scheduleMacroTask(taskName, onComplete, {}, () => null, cancelTask);
    scheduleTask(_task);

    return () => {
      if (scheduled && task) {
        task.zone.cancelTask(task);
        scheduled = false;
      }
      if (sub) {
        sub.unsubscribe();
        sub = null;
      }
    };
  });

  return obs;
}