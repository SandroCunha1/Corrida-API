import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  constructor(private service: UserService) {}

  public user = {} as User;
  public users!: User[];
  public error!: string;

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: User) => {
        this.user = res;
      },
    });
  }

  public getByName() {
    if (this.user.name.length <= 0) {
      this.service.listAll().subscribe();
    } else {
      this.service.getByName(this.user.name).subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Erro ao obter usuários:', error);
        }
      );
    }
  }

  public isEmpty(): boolean {
    if (
      this.user.name &&
      this.user.email  &&
      this.user.roles &&
      (this.user.id || this.user.password)
    ) {
      return false;
    }
    return true;
  }

  public isError(): boolean {
    if (this.service.error) {
      this.error = this.service.error;
      return true;
    } else {
      this.error = '';
      return false;
    }
  }

  public save() {
    if (this.user.id) {
      this.service.update(this.user).subscribe((data) => {
        this.user = {} as User;
      });
    } else {
      this.service.insert(this.user).subscribe((data) => {
        this.user = {} as User;
      });
    }
  }
}
