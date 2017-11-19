import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
	email = "";
	password = "";

	constructor(private route: ActivatedRoute,
				public router: Router,
				public afAuth: AngularFireAuth,
				public af: AngularFireDatabase) {
	}

	login() {
		this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
		.then(
			(success) => {
				console.log(success);
				this.router.navigate(['/incoming']);
			}
		).catch(
			(err) => {
				console.log(err);
		});
	}

	logout() {
		this.afAuth.auth.signOut();
	}
}
