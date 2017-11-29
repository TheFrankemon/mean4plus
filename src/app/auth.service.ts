import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/interfaces";
import { ActivatedRoute } from "@angular/router/src/router_state";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database-deprecated";

@Injectable()
export class AuthService implements CanActivate {
	user: FirebaseObjectObservable<any[]>;
	isAdmin: boolean = false;

	isLogged: boolean;
	mail: string = "";
	pwd: string = "";

	constructor(private router: Router,	private afAuth: AngularFireAuth,
				private afDB: AngularFireDatabase) {}

	logIn(mail, pwd): boolean {
		this.mail = mail;
		this.pwd = pwd;
		this.afAuth.auth.signInWithEmailAndPassword(this.mail, this.pwd)
			.then(
				(success) => {
					console.log(success);
					this.router.navigate(['/incoming']);
					this.isLogged = true;
				}
			).catch(
				(err) => {
					console.log(err);
					this.isLogged = false;
				}
			);

		return this.isLogged;
	}

	logOut() {
		this.afAuth.auth.signOut();
		this.isLogged = false;
		this.router.navigate(['']);
	}

	canActivate(): boolean {
		if (this.isLogged) {
			return true; 
		}
		this.router.navigate(['']);
		return false;
	}

	checkRole(): boolean {
		let uid = this.afAuth.auth.currentUser.uid;
		this.afDB.object('users/' + uid + '/isAdmin', { preserveSnapshot: true })
			.subscribe(snapshot => {
				this.isAdmin = snapshot.val();
			}
		);

		return this.isAdmin;
	}
}