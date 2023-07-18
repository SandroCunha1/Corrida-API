import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private urlBase = 'http://localhost:8080/users';

  public emitEvent = new EventEmitter();

  private usersSubject = new Subject<User[]>();

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getByName(name: string): Observable<User[]> {
    this.http
      .get<User[]>(`${this.urlBase}/name/${name}`)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public insert(user: User): Observable<User>{
    return this.http.post<User>(this.urlBase, user, this.httpOption)
    .pipe(
      tap(() => {
        this.listAll();
      })
    )
  }

  public update(user: User): Observable<User>{
    return this.http.put<User>(`${this.urlBase}/${user.id}`, user, this.httpOption)
    .pipe(
      tap(() => {
        this.listAll();
      })
    )
  }

  public delete(user: User): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${user.id}`)
  }

  public editUser(user: User) {
    this.emitEvent.emit(user);
  }
}
