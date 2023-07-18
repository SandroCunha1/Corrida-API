import { Component } from '@angular/core';
import { SpeedWay } from '../../models/speed-way';
import { SpeedWayService } from '../../services/speed-way.service';

@Component({
  selector: 'app-speed-way-table',
  templateUrl: './speed-way-table.component.html',
  styleUrls: ['./speed-way-table.component.scss'],
})
export class SpeedWayTableComponent {
  constructor(private service: SpeedWayService) {}

  public speedways!: SpeedWay[];

  ngOnInit(): void {
    this.service.listAll().subscribe((speedways) => {
      this.speedways = speedways;
    });
  }

  public editItem(speedway: SpeedWay) {
    const newSpeedway: SpeedWay = { ...speedway };
    this.service.editUser(newSpeedway);
  }

  

  public delete(speedway: SpeedWay) {
    this.service.delete(speedway).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.speedways = data;
      });
    });
  }
}
