import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
	email = '';
	password = '';

	constructor(private authService: AuthService) {}

	login() {
		this.authService.logIn(this.email, this.password);
	}
}
