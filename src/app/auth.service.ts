import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/interfaces";
import { ActivatedRoute } from "@angular/router/src/router_state";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

@Injectable()
export class AuthService implements CanActivate {
	isLogged: boolean;
	mail: string = "";
	pwd: string = "";

	constructor(public router: Router,
		public afAuth: AngularFireAuth,
		public af: AngularFireDatabase) {}

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
					this.isLogged = true;
			});

		return this.isLogged;
	}

	logOut() {
		this.afAuth.auth.signOut();
	}

	canActivate(): boolean {
		const isAuth = this.logIn(this.mail, this.pwd);
		if(!isAuth){
			this.router.navigate(['/']);
		}
		return isAuth;
	}
}