import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {
	clients: FirebaseListObservable<any[]>;
	selectvalue = "Select";
	completedvalue = "Completed";
	selectcolor = "darkgreen";
	dbUser = "";
	loggedUser = "";
	userUID = "";
	key = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
		this.userUID = this.afAuth.auth.currentUser.uid;
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	select(key) {
		this.loggedUser = this.afAuth.auth.currentUser.displayName;
		this.key = key;

		this
			.clients.update(key, { 
				user: this.loggedUser,
				userUID: this.userUID
			})
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...')
			);
	}

	getColor(client) {
		return this.sameUser(client) ? 'red' : 'green';
	}

	disableButton(client) {
		return this.sameUser(client);
	}

	private sameUser(client) {
		return client.userUID && client.userUID !== this.userUID;
	}

	hide(key) {
		this.clients.update(key, { isCompleted: true })
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...'
			));
	}
}
