import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { SpeedWay } from '../models/speed-way';
import { Country } from '../../country/models/country';
import { GlobalService } from '../../../global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SpeedWayService {
  constructor(private http: HttpClient, private globalService: GlobalService, private router: Router) {}

  private urlBase = 'http://localhost:8080/runways';

  public emitEvent = new EventEmitter();

  private speedwaySubject = new Subject<SpeedWay[]>();

  public httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.globalService.token,
    }),
  };

  public listAll(): Observable<SpeedWay[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<SpeedWay[]>(this.urlBase, httpOption)
      .subscribe((speedways) => this.speedwaySubject.next(speedways),
      (error) =>{
        this.router.navigateByUrl('');
      });
    return this.speedwaySubject.asObservable();
  }

  public getByName(name: string): Observable<SpeedWay[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<SpeedWay[]>(`${this.urlBase}/name/${name}`, httpOption)
      .subscribe(
        (speedways) => this.speedwaySubject.next(speedways),
        (error) => {
          console.log(error.error.error);
        }
      );
    return this.speedwaySubject.asObservable();
  }

  public getByCountry(country: Country): Observable<SpeedWay[]> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<SpeedWay[]>(`${this.urlBase}/country/${country.id}`, httpOption)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public insert(speedway: SpeedWay): Observable<SpeedWay> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.post<SpeedWay>(this.urlBase, speedway, httpOption).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(speedway: SpeedWay): Observable<SpeedWay> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<SpeedWay>(`${this.urlBase}/${speedway.id}`, speedway, httpOption)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(speedway: SpeedWay): Observable<void> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`, httpOption);
  }

  public editUser(speedway: SpeedWay) {
    this.emitEvent.emit(speedway);
  }
}
