import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth.service';

@Component({
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
	clients: FirebaseListObservable<any[]>;

	constructor(public af: AngularFireDatabase, private authService : AuthService) {
		this.clients = af.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: true
			}
		});
	}

	logout() {
		this.authService.logOut();
	}
}
