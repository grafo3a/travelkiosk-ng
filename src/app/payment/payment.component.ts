import { Component } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';
import { ReservationModel } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  objetReservationAffichage: ReservationModel|undefined;
  numeroReservationFourni = "";
  messageErreurNumeroReservationVide = "";
  messageErreurPaiement = "";
  messageSuccesPaiement = "";
  messageErreurRecherche = "";
  messageSuccesRecherche = "";
  prefixeTicket = ReservationService.getPrefixeTicket();


  constructor(
    // On cree une instance pour les services qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService,
    private serviceReservation: ReservationService
  ) {}


  ngOnInit(): void {
    // On colore l'element actif du menu
    this.serviceMenus.updateActiveComponent("option021Payment");
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

    this.resetErrorSuccesMessages();

    if (this.objetReservationAffichage == undefined) {
      this.messageErreurPaiement =
        "ERROR. No reservation loaded. Type a reservation number and click the check status button above.";
    
    } else if(this.objetReservationAffichage.isTicketPaid == true){
      this.messageErreurPaiement =
        "ERROR. Payment is already completed for " + this.numeroReservationFourni;
      
    } else {
      ReservationService.effectuerPaiementTicket(this.numeroReservationFourni);
      this.messageSuccesPaiement = "Payment accepted. Your ticket is now available.";
    }
  }


  resetReservationDetailsDisplay(){
    this.objetReservationAffichage = undefined;
  }


  resetErrorSuccesMessages(){
    this.messageErreurNumeroReservationVide = "";
    this.messageErreurPaiement = "";
    this.messageErreurRecherche = "";
    this.messageSuccesPaiement = "";
    this.messageSuccesRecherche = "";
  }
}
