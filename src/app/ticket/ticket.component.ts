import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  constructor(
    // On cree une instance pour les services qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService
  ) {}


  ngOnInit(): void {
    this.serviceMenus.updateActiveComponent("option03Ticket");
    //
  }
}
