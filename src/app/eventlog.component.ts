import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ReversePipe } from './reverse.pipe';

@Component({
  templateUrl: './eventlog.component.html'
})
export class EventLogComponent {
	events: FirebaseListObservable<any[]>;

	constructor(public afDB: AngularFireDatabase) {
		this.events = afDB.list('eventlog');
	}
}
