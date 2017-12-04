import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {
	clients: FirebaseListObservable<any[]>;

	constructor(public afDB: AngularFireDatabase,
				private authService: AuthService,
				private router: Router) {
		this.clients = afDB.list('clients', {
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
}
