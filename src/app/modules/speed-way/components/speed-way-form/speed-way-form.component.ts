import { Component } from '@angular/core';
import { SpeedWayService } from '../../services/speed-way.service';
import { CountryService } from 'src/app/modules/country/services/country.service';
import { SpeedWay } from '../../models/speed-way';
import { Country } from 'src/app/modules/country/models/country';

@Component({
  selector: 'app-speed-way-form',
  templateUrl: './speed-way-form.component.html',
  styleUrls: ['./speed-way-form.component.scss']
})
export class SpeedWayFormComponent {
  constructor(private service: SpeedWayService, private countryService: CountryService){}

  public speedway:SpeedWay = {} as SpeedWay

  public countrys!: Country[]
  public speedways!: SpeedWay[];

  public countrythis:Country = {} as Country

  ngOnInit(): void {
    this.countryService.listAll().subscribe((country) => {
      this.countrys = country;
    });

    this.service.emitEvent.subscribe({
      next: (res: SpeedWay) => {
        this.speedway = res;
        let country = this.countrys.find((country) => this.speedway.country.id === country.id )
        if(country !== undefined){
          this.speedway.country = country;
        }
      },
    })
  }

  public getByName(){
    if(this.speedway.name.length <= 0){
      this.service.listAll().subscribe()
    }else{
      this.service.getByName(this.speedway.name).subscribe((data)=>{
      this.speedways = data;
    })
    }
    
    
  }


  public save(){
    if(this.speedway.id){
      this.service.update(this.speedway).subscribe((data) => {     
        this.speedway = {} as SpeedWay;
      })
    }else{
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as SpeedWay;
      })
    }
  }
}
