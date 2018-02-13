import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {

	clients: FirebaseListObservable<any[]>;
	userUID = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
		this.userUID = this.afAuth.auth.currentUser.uid;
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	toggleSelect(user, key) {
		!user ? this.select(key) : this.unselect(key) ;
	}

	select(key) {
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
	}

	unselect(key) {
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
	}

	getColor(client): string {
		if (!client.userUID)
			return 'darkgreen';

		return this.sameUser(client) ? 'red' : 'green';
	}

	disableButton(client) {
		return this.sameUser(client);
	}

	private sameUser(client) {
		return client.userUID && client.userUID !== this.userUID;
	}

	hide(key) {
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
	}
}
