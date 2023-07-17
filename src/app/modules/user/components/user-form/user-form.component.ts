import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private service: UserService){}

  public user = {} as User

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: User) => {
        this.user = res;
      }
    })
  }

  public getByName(){
    this.service.getByName(this.user.name);
  }


}
