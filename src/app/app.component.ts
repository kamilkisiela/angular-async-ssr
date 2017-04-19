import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/take';

import { Api } from './api.service';

@Component({
	selector: 'app',
	template: `
	  <h1>SSR</h1>
	  <div>Works: {{ssr}}</div>
	`
})
export class AppComponent implements OnInit {
  ssr = false;
  
  constructor(
    private api: Api
  ) {}

  ngOnInit() {
		// Using fetch()
		this.api.check('fetch').take(1).subscribe(() => this.response());

		// Using Http service
		// this.api.check('http').take(1).subscribe(() => this.response());
  }

	response() {
		this.ssr = true;
	}
}
