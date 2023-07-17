import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit{
  public users ! : User[];

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((users) => {
      this.users = users;
    });
  }

  public editItem(user:User){
    let newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      password: user.password
    }
    this.service.editUser(newUser);
  }

  

  
}
