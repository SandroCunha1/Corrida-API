import { Component } from '@angular/core';
import { LoginService } from '../services/login.service'
import { Router } from '@angular/router';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public login = {} as Login;
  public loginError = false; 
  public loginErrorMessage = '';

  constructor(private service: LoginService, private router: Router) {} 


  loginButton(): void {
    if (this.login.email && this.login.password) {
      this.service.login(this.login.email, this.login.password).subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.loginError = true;
          this.loginErrorMessage = 'Email ou senha inválidos!';        
        }
      );
    }
  }
}
