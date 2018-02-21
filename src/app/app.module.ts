import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login.component';
import { IncomingComponent } from './incoming.component';
import { CompletedComponent } from './completed.component';
import { UserFormComponent } from './userform.component';
import { EventLogComponent } from './eventlog.component';
import { AuthService } from './auth.service';
import { ReversePipe } from './reverse.pipe';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as c from "./firebaseconfig.json";

const config = (<any>c);
const appRoutes: Routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' },
	{ path: 'incoming', component: IncomingComponent, canActivate: [ AuthService ] },
	{ path: 'completed', component: CompletedComponent, canActivate: [ AuthService ] },
	{ path: 'newUser', component: UserFormComponent, canActivate: [ AuthService ] },
	{ path: 'eventLog', component: EventLogComponent, canActivate: [ AuthService ] },
	{ path: '**', redirectTo: '' }
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
		LoginComponent,
		IncomingComponent,
		CompletedComponent,
		UserFormComponent,
		EventLogComponent,
		ReversePipe
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})

export class AppModule { }
