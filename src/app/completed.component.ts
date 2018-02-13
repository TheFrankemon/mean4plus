import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
	clients: FirebaseListObservable<any[]>;
	filteredclients: FirebaseListObservable<any[]>;
	searchText: string = "";

	constructor(public afDB: AngularFireDatabase) {
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: true
			}
		});

		this.filteredclients = this.clients;
	}

	filter() {
		if (this.searchText != "") {
			this.filteredclients = this.afDB.list('clients', {
				query: {
					orderByChild: 'name',
					startAt: this.searchText,
					endAt: this.searchText + "\uf8ff"
				}
			});
		} else {
			this.filteredclients = this.clients;
		}
			// this.afDB.database.ref('clients')
			// 	.orderByChild('name')
			// 	.startAt(this.searchText)
			// 	.endAt(this.searchText+"\uf8ff")
			// 	.once("value")
			// 	.then(snapshot => {
			// 		this.filteredclients = snapshot
			// 	});
	}
}
