import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { SpeedWay } from '../models/speed-way';
import { Country } from '../../country/models/country';

@Injectable({
  providedIn: 'root',
})
export class SpeedWayService {
  constructor(private http: HttpClient) {}

  private urlBase = 'http://localhost:8080/runways';

  public emitEvent = new EventEmitter();

  private speedwaySubject = new Subject<SpeedWay[]>();

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<SpeedWay[]> {
    this.http
      .get<SpeedWay[]>(this.urlBase)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public getByName(name: string): Observable<SpeedWay[]> {
    this.http
      .get<SpeedWay[]>(`${this.urlBase}/name/${name}`)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }

  public getByCountry(country: Country): Observable<SpeedWay[]> {
    this.http
      .get<SpeedWay[]>(`${this.urlBase}/country/${country.id}`)
      .subscribe((speedways) => this.speedwaySubject.next(speedways));
    return this.speedwaySubject.asObservable();
  }
  
  public insert(speedway: SpeedWay): Observable<SpeedWay> {
    return this.http
      .post<SpeedWay>(this.urlBase, speedway, this.httpOption)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(speedway: SpeedWay): Observable<SpeedWay> {
    return this.http
      .put<SpeedWay>(
        `${this.urlBase}/${speedway.id}`,
        speedway,
        this.httpOption
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(speedway: SpeedWay): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`);
  }

  public editUser(speedway: SpeedWay) {
    this.emitEvent.emit(speedway);
  }
}
