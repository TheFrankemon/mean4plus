import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { CompletedComponent } from './completed.component';
import { IncomingComponent } from './incoming.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import * as c from "./firebaseconfig.json";

const config = (<any>c);
const appRoutes: Routes = [
	{ path: '', component: IncomingComponent },
	{ path: 'completed', component: CompletedComponent },
	{ path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true }
		),
		AngularFireModule.initializeApp(config),
		AngularFireDatabaseModule
	],
	declarations: [
		AppComponent,
		CompletedComponent,
		IncomingComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
