import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {

	visitors: FirebaseListObservable<any[]>;
	eventlog: FirebaseListObservable<any[]>;
	userUID = "";
	comment = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
		this.userUID = this.afAuth.auth.currentUser.uid;
		this.visitors = afDB.list('visitors', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
		this.eventlog = afDB.list('eventlog');
	}

	toggleSelect(user, visitor) {
		!user ? this.select(visitor.$key, visitor.name) : this.unselect(visitor.$key, visitor.name) ;
	}

	select(key, name) {
		this.visitors
			.update(key, {
				user: this.afAuth.auth.currentUser.displayName,
				userUID: this.userUID
			})
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...')
			);
		
		this.eventlog
			.push({
				visitor: name,
				event: "SELECTED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}

	unselect(key, name) {
		this.visitors
			.update(key, {
				user: "",
				userUID: ""
			})
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...')
			);
		
		this.eventlog
			.push({
				visitor: name,
				event: "UNSELECTED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}

	getDate(): string {
		// 09/01/18 10:12:23
		var now = new Date();
		var timestamp = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate()) + "/"
					  + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + "/"
					  + now.getFullYear().toString().substr(2) + " "
					  + (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":"
					  + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":"
					  + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
		return timestamp;
	}

	getColor(visitor): string {
		if (!visitor.userUID)
			return 'gray';

		return this.sameUser(visitor) ? 'red' : 'green';
	}

	sameUser(visitor): boolean {
		return visitor.userUID && visitor.userUID !== this.userUID;
	}

	complete(key, name) {
		this.visitors
			.update(key, {
				isCompleted: true,
				comment: this.comment
			})
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...')
			);
		
		this.eventlog
			.push({
				visitor: name,
				event: "COMPLETED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}
}
