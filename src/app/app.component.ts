import { Component, OnInit } from '@angular/core';

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
		// this.api.check('fetch').then(() => this.ssr = true);

		// Using Http service
		this.api.check('http').then(() => this.ssr = true);
  }
}
