import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
	result:any;

	constructor(private _http: Http) { }

	getClients() {
		return this._http.get("/api/clients")
			.map(res => this.result = res.json().data);
	}
}