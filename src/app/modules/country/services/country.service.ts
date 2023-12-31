import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { GlobalService } from '../../../global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient, private globalService: GlobalService, private router: Router) {}

  private urlBase = 'http://localhost:8080/countrys';

  public emitEvent = new EventEmitter();

  private countrySubject = new Subject<Country[]>();

  public error!: string;

  private countrys!: Country[];

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Country[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<Country[]>(this.urlBase, httpOption)
      .subscribe(
        (countrys) => {this.countrySubject.next(countrys); this.error = '';},
        (error) =>{
          this.router.navigateByUrl('');
        });
    return this.countrySubject.asObservable();
  }

  public getByName(name: string): Observable<Country[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .get<Country[]>(`${this.urlBase}/name/${name}`, httpOption).pipe(
        catchError((error) => {
          this.countrySubject.next(this.countrys);
          this.error = '* '+ error.error.error

          return throwError(() => {return error;});
        }),
        tap((countrys) => {
          this.countrySubject.next(countrys);
          this.error = '';
        })
      );
  }

  public insert(user: Country): Observable<Country> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<Country>(this.urlBase, user, httpOption).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(country: Country): Observable<Country> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, httpOption)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${country.id}`, httpOption);
  }

  public editUser(country: Country) {
    this.emitEvent.emit(country);
  }
}
