import * as fs from 'fs';
import { renderModuleFactory } from '@angular/platform-server';

const templateCache = {};

export function ngExpressEngine(setupOptions){

	return function(filePath, options, callback){
		if (!templateCache[filePath]) {
			const file = fs.readFileSync(filePath);
			templateCache[filePath] = file.toString();
		}
    
		renderModuleFactory(setupOptions.bootstrap[0], {
			document: templateCache[filePath],
			url: options.req.url
		})
		.then(string => {
			callback(null, string);
		});
	}
}