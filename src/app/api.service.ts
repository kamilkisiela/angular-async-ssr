import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { toPromise } from 'rxjs/operator/toPromise';

export type HttpOrFetch = 'http' | 'fetch';

@Injectable()
export class Api {
  constructor(
    private http:Http
  ) {}

  check(httpOrFetch: HttpOrFetch): Promise<boolean> {
    const url = 'http://localhost:4200/check';

    if (httpOrFetch === 'http') {
      return toPromise.call(this.http.get(url)).then(() => Promise.resolve(true));
    } else {
      return fetch(url).then(() => Promise.resolve(true));
    }
  }
}