import 'isomorphic-fetch';
import 'zone.js/dist/zone-node';

import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { AppServerModule } from './app/app.server.module';
import { AppServerModuleNgFactory } from './ngfactory/src/app/app.server.module.ngfactory';
import { ngExpressEngine } from './engine';

enableProdMode();

const app = express();

app.engine('html', ngExpressEngine({
	baseUrl: 'http://localhost:4200',
	bootstrap: [ AppServerModuleNgFactory ]
}));

app.set('view engine', 'html');
app.set('views', 'src')

app.get('/', (req, res) => {
	res.render('index', { req });
});

app.get('/check', (req, res) => {
	res.json({ check: true });
});

app.listen(4200,() => {
	console.log('Visit http://localhost:4200');
	console.log('listening...')
});