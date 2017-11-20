import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { CompletedComponent } from './completed.component';
import { IncomingComponent } from './incoming.component';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as c from "./firebaseconfig.json";

const config = (<any>c);
const appRoutes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'incoming', component: IncomingComponent, canActivate: [ AuthService ] },
	{ path: 'completed', component: CompletedComponent, canActivate: [ AuthService ] },
	{ path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true }
		),
		AngularFireModule.initializeApp(config),
		AngularFireDatabaseModule,
		AngularFireAuthModule
	],
	declarations: [
		AppComponent,
		CompletedComponent,
		IncomingComponent,
		LoginComponent
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})

export class AppModule { }
