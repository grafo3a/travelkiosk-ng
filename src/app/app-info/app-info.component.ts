import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent {

  constructor(
    // On cree une instance pour chaque service qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService
  ) {}


  ngOnInit(): void {
    this.serviceMenus.updateActiveComponent("option05Info");
    //
  }

}
