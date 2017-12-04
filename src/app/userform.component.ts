import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
//import * as admin from "firebase-admin";
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  templateUrl: './userform.component.html'
})
export class UserFormComponent {
	users: FirebaseListObservable<any[]>;
	email = "";
	password = "";
	firstname = "";
	lastname = "";
	uid = "";

	constructor(public afDB: AngularFireDatabase, private authService : AuthService) {
		//var serviceAccount = require("./photosqupb-firebase-adminsdk-zpz00-99e0ecd4a9.json");
		
		//admin.initializeApp({
		//  credential: admin.credential.cert(serviceAccount),
		//  databaseURL: "https://photosqupb.firebaseio.com"
		//});

		this.users = afDB.list('users', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	createUser() {
		let dname = this.firstname + " " + this.lastname;
		//admin.auth().createUser({
		//	email: this.email,
		//	password: this.password,
		//	displayName: dname
		//})
		//	.then(function(userRecord) {
		//		// See the UserRecord reference doc for the contents of userRecord.
		//		console.log("Successfully created new user:", userRecord.uid);
		//		this.uid = userRecord.uid;
		//	})
		//	.catch(function(error) {
		//		console.log("Error creating new user:", error);
		//	});
		
		//this.afDB.database.ref('users/' + this.uid).set({
		//	isAdmin: false
		//});
	}
}