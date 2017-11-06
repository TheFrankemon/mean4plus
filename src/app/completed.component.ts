import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
	clients: FirebaseListObservable<any[]>;

	constructor(public af: AngularFireDatabase) {
		this.clients = af.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: true
			}
		});
	}
}
