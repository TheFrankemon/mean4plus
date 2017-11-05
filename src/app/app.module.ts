import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import * as c from "./firebaseconfig.json";

const config = (<any>c);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		AngularFireModule.initializeApp(config),
		AngularFireDatabaseModule
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
