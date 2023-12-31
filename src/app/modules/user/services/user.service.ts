import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { GlobalService } from '../../../global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private globalService: GlobalService, private router: Router) {}

  private urlBase = 'http://localhost:8080/users';

  public emitEvent = new EventEmitter();

  private usersSubject = new Subject<User[]>();
  private users!: User[];
  public error!: string;

  public httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.globalService.token,
    }),
  };


  public listAll(): Observable<User[]> { 
    let httpOptions = {  
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http.get<User[]>(this.urlBase, httpOptions).subscribe((users) => {
      this.usersSubject.next(users);
      this.error = '';
    },
    (error) =>{
      console.log(error)
      console.log(this.globalService.token)
      this.router.navigateByUrl('');
    });
    return this.usersSubject.asObservable();
  }


  public getByName(name: string): Observable<User[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.get<User[]>(`${this.urlBase}/name/${name}`, httpOption).pipe(
      catchError((error) => {
        this.usersSubject.next(this.users);
        this.error = '* '+ error.error.error
        return throwError(() => {return error;});
      }),
      tap((users) => {
        this.usersSubject.next(users);
        this.error = '';
      })
    );
  }

  public insert(user: User): Observable<User> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<User>(this.urlBase, user, httpOption).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: User): Observable<User> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<User>(`${this.urlBase}/${user.id}`, user, httpOption)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(user: User): Observable<void> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, httpOption);
  }

  public editUser(user: User) {
    this.emitEvent.emit(user);
  }
}
