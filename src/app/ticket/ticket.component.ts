import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';
import { ReservationModel } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  objetReservationAffichage: ReservationModel|undefined;
  numeroReservationFourni = "";
  messageErreurNumeroReservationVide = "";
  messageErreurAffichageTicket = "";
  messageSuccesAffichageTicket = "";
  messageErreurRecherche = "";
  messageSuccesRecherche = "";


  constructor(
    // On cree une instance de chaque service qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService,
    private serviceReservation: ReservationService
  ) {}


  ngOnInit(): void {
    // On colore l'element actif du menu
    this.serviceMenus.updateActiveComponent("option03Ticket");
  }


  onReservationNumberChange(event: any){

    // Le numero de reservation a été sauvegardé en majuscules.
    this.numeroReservationFourni = event.value.toUpperCase();
    this.resetErrorSuccesMessages();
    this.resetReservationDetailsDisplay();
  }
  
  
  verifierStatutReservation(){

    this.resetErrorSuccesMessages();
    this.resetReservationDetailsDisplay();

    if (this.numeroReservationFourni == "") {
      // Si aucun numero de reservation fourni
      this.messageErreurNumeroReservationVide =
        "ERROR. No reservation number provided. type a reservation number.";
      
    } else {
      /* Si un numero de reservation est fourni.
      Si reservation recherchée absente, on obtient un objet vide */
      let objetReservationPresent: ReservationModel =
        ReservationService.getReservationFromList(this.numeroReservationFourni);
      
      let numeroReservationPresent = objetReservationPresent.numeroReservation;

      // Verif si l'objet est vide (ici numeroReservation sera en majuscules)
      if (numeroReservationPresent == this.numeroReservationFourni) {

        if (objetReservationPresent.isTicketPaid == false) {
          this.messageErreurRecherche = "ERROR. Reservation found but payment not yet completed.";

        } else {
          this.messageSuccesRecherche = "Reservation found : " + objetReservationPresent.numeroReservation;
          this.objetReservationAffichage = objetReservationPresent;
        }

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


  envoyerTicketViaEmail(){

    this.resetErrorSuccesMessages();

    if (this.objetReservationAffichage == undefined) {
      this.messageErreurAffichageTicket =
        "ERROR. No reservation loaded. Type a reservation number and click the check button above.";

    } else {
      this.messageErreurAffichageTicket = "ERROR. No messaging server available. Try later.";
    }
  }


  resetReservationDetailsDisplay(){
    this.objetReservationAffichage = undefined;
  }


  resetErrorSuccesMessages(){
    this.messageErreurNumeroReservationVide = "";
    this.messageErreurAffichageTicket = "";
    this.messageErreurRecherche = "";
    this.messageSuccesAffichageTicket = "";
    this.messageSuccesRecherche = "";
  }
}
