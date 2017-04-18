import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Api } from './api.service';

@NgModule({
	imports: [
		BrowserModule.withServerTransition({
		  appId: 'ssr-app'
		}),
    HttpModule
	],
	providers: [ Api ],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
