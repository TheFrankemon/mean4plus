import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Define a clients property to hold our client data
	clients: FirebaseListObservable<any[]>;

	constructor(public af: AngularFireDatabase) {
		this.clients = af.list('clients');
	}
}
