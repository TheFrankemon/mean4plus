import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	displayName = '';

	constructor(private authService: AuthService, private afAuth: AngularFireAuth) {}

	ngOnInit() {
		this.afAuth.auth.onAuthStateChanged((user) => {
			if (user)
				this.displayName = user.displayName;
		});
	}
}
