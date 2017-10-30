import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	// Define a clients property to hold our client data
	clients: Array<any>;

	// Create an instance of the DataService through dependency injection
	constructor(private _dataService: DataService) {
		// Access the Data Service's getClients() method we defined
		this._dataService.getClients()
			.subscribe(res => this.clients = res);
  }
}
