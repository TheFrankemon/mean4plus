import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ReversePipe } from './reverse.pipe';

@Component({
	templateUrl: './eventlog.component.html'
})
export class EventLogComponent {
	events: FirebaseListObservable<any[]>;
	filteredEvents: FirebaseListObservable<any[]>;
	selectedFilter: string;
	searchText = '';

	constructor(public afDB: AngularFireDatabase) {
		this.events = afDB.list('eventlog');
		this.filteredEvents = this.events;
	}

	filter() {
		if (this.searchText !== '' && this.selectedFilter !== '')
			this.filteredEvents = this.afDB.list('eventlog', {
				query: {
					orderByChild: this.selectedFilter,
					startAt: this.searchText,
					endAt: this.searchText + '\uf8ff'
				}
			});
		else
			this.filteredEvents = this.events;
	}
}
