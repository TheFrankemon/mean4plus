import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
	visitors: FirebaseListObservable<any[]>;
	filteredVisitors: FirebaseListObservable<any[]>;
	searchText = '';

	constructor(public afDB: AngularFireDatabase) {
		this.visitors = afDB.list('visitors', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: true
			}
		});

		this.filteredVisitors = this.visitors;
	}

	filter() {
		if (this.searchText !== '')
			this.filteredVisitors = this.afDB.list('visitors', {
				query: {
					orderByChild: 'name',
					startAt: this.searchText,
					endAt: this.searchText + '\uf8ff'
				}
			});
		else
			this.filteredVisitors = this.visitors;

			// this.afDB.database.ref('visitors')
			// 	.orderByChild('name')
			// 	.startAt(this.searchText)
			// 	.endAt(this.searchText+"\uf8ff")
			// 	.once("value")
			// 	.then(snapshot => {
			// 		this.filteredVisitors = snapshot
			// 	});
	}
}
