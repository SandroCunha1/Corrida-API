import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private urlBase = "http://localhost:8080/users";

  public emitEvent = new EventEmitter();

  private usersSubject = new Subject<User[]>

  public listAll(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase)
    .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getByName(name:string): void {
    this.http.get<User[]>(`${this.urlBase}/name/${name}`)
      .subscribe(users => this.usersSubject.next(users));
  }

  public editUser(user:User){
    this.emitEvent.emit(user);
  }
}
