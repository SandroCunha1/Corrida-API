import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  private urlBase = 'http://localhost:8080/countrys';

  public emitEvent = new EventEmitter();

  private countrySubject = new Subject<Country[]>();

  public error!: string;

  private countrys!: Country[];

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Country[]> {
    this.http
      .get<Country[]>(this.urlBase)
      .subscribe((countrys) => {this.countrySubject.next(countrys); this.error = '';});
    return this.countrySubject.asObservable();
  }

  public getByName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.urlBase}/name/${name}`).pipe(
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
    return this.http.post<Country>(this.urlBase, user, this.httpOption).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(country: Country): Observable<Country> {
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOption)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${country.id}`);
  }

  public editUser(country: Country) {
    this.emitEvent.emit(country);
  }
}
