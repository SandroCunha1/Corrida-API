import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent {

  constructor(private service: CountryService) {}

  public country = {} as Country;

  public countrys!: Country[];

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: Country) => {
        this.country = res;
      },
    });
  }

  public getByName() {
    this.service.getByName(this.country.name).subscribe((data) => {
      this.countrys = data;
    });
  }

  public save() {
    if (this.country.id) {
      this.service.update(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    } else {
      this.service.insert(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    }
  }
}
