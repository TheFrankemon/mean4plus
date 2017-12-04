import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	constructor(private authService:AuthService,
				private router:Router) {}

	userForm() {
		this.router.navigate(['newUser']);
	}
}
