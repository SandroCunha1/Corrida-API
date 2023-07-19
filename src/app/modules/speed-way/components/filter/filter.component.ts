import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpeedWayService } from '../../services/speed-way.service';
import { CountryService } from 'src/app/modules/country/services/country.service';
import { SpeedWay } from '../../models/speed-way';
import { Country } from 'src/app/modules/country/models/country';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(
    private service: SpeedWayService,
    private countryService: CountryService
  ) {}

  public speedway: SpeedWay = {} as SpeedWay;

  public tamMin!:number
  public tamMax!:number
  
  public countrys!: Country[];
  @Output() newList = new EventEmitter<SpeedWay[]>();
  public list = {} as SpeedWay[]

  public countrythis!: Country;

  ngOnInit(): void {
    this.countryService.listAll().subscribe((country) => {
      this.countrys = country;
    });
    this.service.emitEvent.subscribe({
      next: (res: SpeedWay) => {
        this.speedway = res;
        let country = this.countrys.find(
          (country) => this.speedway.country.id === country.id
        );
        if (country !== undefined) {
          this.speedway.country = country;
        }
      },
    });
  }

  public getCountry(){
    if(this.countrythis != undefined){
      this.service.getByCountry(this.countrythis).subscribe((data)=>{
        this.list = data
      })
    }else{
      this.service.listAll().subscribe((data)=>{
        this.list = data
      })
    }
  }
}
