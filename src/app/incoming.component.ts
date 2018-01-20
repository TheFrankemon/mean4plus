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
	key = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
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
		this.clients.update(key, { user: this.loggedUser })
			.then(_ =>
				console.log('Update succeded!')
			)
			.catch(err =>
				console.log(err, 'Something happened at updating...')
			);
		
		this.afDB.database.ref('clients/' + key + '/user').once('value')
			.then(snapshot => {
				this.dbUser = snapshot.val();
				this.selectvalue = "Selected by " + this.dbUser;

				//Returns true for the user who selected the client, for everybody else returns false.
				this.selectcolor = (this.dbUser == this.loggedUser) ? "green" : "darkgrey";
			});
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
