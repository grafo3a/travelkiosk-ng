import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';
import { ReservationModel } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  objetReservationAffichage: ReservationModel|undefined;
  numeroReservationFourni = "";
  message_erreur_paiement = "";
  message_succes_paiement = "";
  newTicketNumber = "";
  prefixeTicket = "TICKET_PAX";


  constructor(
    // On cree une instance pour les services qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService,
    private serviceReservation: ReservationService
  ) {}


  ngOnInit(): void {
    this.serviceMenus.updateActiveComponent("option021Payment");
    //
  }


  onReservationNumberChange(event: any){
    // Le numero de reservation a été sauvegardé en majuscules.
    this.numeroReservationFourni = event.value.toUpperCase();
  }
  
  
  verifierStatutReservation(){
    
    let objetReservationPresent: ReservationModel =
      ReservationService.getReservationFromList(this.numeroReservationFourni);

    // Verif si l'objet est vide (ici numeroReservation sera en majuscules)
    if (objetReservationPresent.numeroReservation == this.numeroReservationFourni) {
      this.message_succes_paiement =
        "Reservation trouvée : " + objetReservationPresent.numeroReservation;
        this.objetReservationAffichage = objetReservationPresent;

    } else {
       this.message_erreur_paiement = "ERREUR. Reservation absente." +
        objetReservationPresent.numeroReservation;
    }


    /*
    try {
    } catch (e) {
      this.message_erreur_paiement = "-- ERREUR. Reservation absente." + (e as Error).message;
    }
    */
  }

  
  effectuerPaiement(){
    // A FAIRE
  }


  resetReservationDetailsDisplay(){
    // A FAIRE
  }

}
