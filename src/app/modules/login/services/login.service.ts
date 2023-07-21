import { Injectable } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private globalService: GlobalService) {}

  login(email: string, password: string) {
    return this.globalService.getToken(email, password);
  }
}
