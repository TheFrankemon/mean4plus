import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
	clients: FirebaseListObservable<any[]>;

	constructor(public afDB: AngularFireDatabase,
				private authService: AuthService,
				private router: Router) {
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: true
			}
		});
	}
}
