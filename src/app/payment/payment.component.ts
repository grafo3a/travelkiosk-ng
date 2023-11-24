import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(
    // On cree une instance pour les services qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService
  ) {}


  ngOnInit(): void {
    this.serviceMenus.updateActiveComponent("option021Payment");
    //
  }

}
