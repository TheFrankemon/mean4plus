import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './userform.component.html'
})
export class UserFormComponent {
	users: FirebaseListObservable<any[]>;
	firstname = "";
	lastname = "";
	email = "";
	password = "";
	uid = "";

	constructor(public afDB: AngularFireDatabase, private afAuth: AngularFireAuth, private authService: AuthService) {
		this.users = afDB.list('users', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	createUser() {
		this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
			.then((userRecord) => {
				// See the UserRecord reference doc for the contents of userRecord.
				console.log("Successfully created new user:", userRecord.uid);
				this.afDB.database.ref('users/' + userRecord.uid).set({
					isAdmin: false
				});

				let dname = this.firstname + " " + this.lastname;
				userRecord.updateProfile({
					displayName: dname
				})
			})
			.catch((error) => {
				console.log("Error creating new user:", error.code, error.message);
			});

		this.authService.logOut();
	}
}
