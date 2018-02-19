import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {

	clients: FirebaseListObservable<any[]>;
	eventlog: FirebaseListObservable<any[]>;
	userUID = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
		this.userUID = this.afAuth.auth.currentUser.uid;
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
		this.eventlog = afDB.list('eventlog');
	}

	toggleSelect(user, client) {
		!user ? this.select(client.$key, client.name) : this.unselect(client.$key, client.name) ;
	}

	select(key, name) {
		this.clients
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
				client: name,
				event: "SELECTED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}

	unselect(key, name) {
		this.clients
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
				client: name,
				event: "UNSELECTED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}

	getDate() : string {
		//09/01/18 10:12:23
		var now = new Date();
		var timestamp = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate()) + "/"
					  + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + "/"
					  + now.getFullYear().toString().substr(2) + " "
					  + (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":"
					  + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":"
					  + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
		return timestamp;
	}

	getColor(client): string {
		if (!client.userUID)
			return 'gray';

		return this.sameUser(client) ? 'red' : 'green';
	}

	sameUser(client) : boolean {
		return client.userUID && client.userUID !== this.userUID;
	}

	complete(key, name) {
		this.clients
			.update(key, {
				isCompleted: true
			})
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...'
			));
		
		this.eventlog
			.push({
				client: name,
				event: "COMPLETED",
				ts: this.getDate(),
				user: this.afAuth.auth.currentUser.displayName
			})
			.then(_ =>
				console.log('event added!')
			);
	}
}
