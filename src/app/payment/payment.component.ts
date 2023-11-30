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
  messageErreurNumeroVide = "";
  messageErreurPaiement = "";
  messageSuccesPaiement = "";
  messageErreurRecherche = "";
  messageSuccesRecherche = "";
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
    this.resetReservationDetailsDisplay();
  }
  
  
  verifierStatutReservation(){

    if (this.numeroReservationFourni == "") {
      // Si aucun numero de reservation fourni
      this.messageErreurNumeroVide = "ERROR. No reservation number provided. type a reservation number.";

    } else {
      /* Si un numero de reservation est fourni.
      Si reservation recherchée absente, on obtient un objet vide */
      let objetReservationPresent: ReservationModel =
        ReservationService.getReservationFromList(this.numeroReservationFourni);
      
      let numeroReservationPresent = objetReservationPresent.numeroReservation;

      // Verif si l'objet est vide (ici numeroReservation sera en majuscules)
      if (numeroReservationPresent == this.numeroReservationFourni) {

        this.messageSuccesRecherche = "Reservation found : " + objetReservationPresent.numeroReservation;
        this.objetReservationAffichage = objetReservationPresent;

      } else {
          this.messageErreurRecherche = "ERROR. No reservation found for " +
            this.numeroReservationFourni;
      }
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
    this.messageErreurNumeroVide = "";
    this.messageErreurPaiement = "";
    this.messageErreurRecherche = "";
    this.messageSuccesPaiement = "";
    this.messageSuccesRecherche = "";
    this.newTicketNumber = "";
    this.objetReservationAffichage = undefined;
  }
}
