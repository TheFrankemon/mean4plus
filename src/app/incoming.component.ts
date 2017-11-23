import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth.service';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {
	// Define a clients property to hold our client data
	clients: FirebaseListObservable<any[]>;

	constructor(public af: AngularFireDatabase, private authService : AuthService) {
		this.clients = af.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	hide(key) {
		const promise = this.clients.update(key, { isCompleted: true });
		promise
			.then(_ => console.log('Update succeded!'))
			.catch(err => console.log(err, 'Something happened at updating...'));
	}

	logout() {
		this.authService.logOut();
	}
}
