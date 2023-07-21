import { Component } from '@angular/core';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(private globalService: GlobalService) {}

  public clearToken(){
    localStorage.setItem('token', JSON.stringify(''))
  }

}
