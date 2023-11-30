import { Component, Inject } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { MenusService } from '../services/menus.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { IVol } from '../models/ivol.model';
import { timer } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { ReservationModel } from '../models/reservation.model';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  listeVols_dispo: IVol[] | undefined;
  objetVol: IVol | undefined;

  date_yyyy_mm_dd = "None";    // La valeur du datepicker
  url_base_serveur = "http://localhost:8080/flischeklowa/vols-rest/json/";
  url_demo_pl = "../../assets/demo_vols_pl.json";
  url_demo_de = "../../assets/demo_vols_de.json";
  messageErreurDetails = "";
  messageErreurNumeroVide = "";
  messageStatut = "";
  message_erreur_reservation = "";
  message_succes_reservation = "";
  numeroVol = "None";
  paxName = "";
  paxSurname = "";
  fareCost = "";
  newReservationNumber = "";
  isTicketPaid = false;
  prefixeTicket = "TICKET_PAX_";
  
  
  constructor(
    // On cree une instance pour chaque service qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService,
    
    private serviceReservation: ReservationService,

    // Pour le datepicker
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}


  ngOnInit(): void {
    // On colore l'element actif par defaut
    this.serviceMenus.updateActiveComponent("option02Reservation");

    /* Pour le datepicker.
    The French locale produces the DD/MM/YYYY format */
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }


  onDatepickerEvent(type: string, event: MatDatepickerInputEvent<any>) {

    // Pour le datepicker
    const eventValue: Date = event.value;
    const year = eventValue.getFullYear();
    let month = eventValue.getMonth() + 1;  // ici 0 = Janvier, 11 = decembre.
    let day = eventValue.getDate();
    let month_string = month.toString();
    let day_string = day.toString();

    if (month < 10) {
      month_string = "0" + month;
    }

    if (day < 10) {
      day_string = "0" + day;
    }

    this.date_yyyy_mm_dd = year + "-" + month_string + "-" + day_string;
    this.resetFlightDetailsDisplay();
  }


  onFlightNumberChange(event: any){

    if (event.value == "") {
      this.numeroVol = "None";

    } else {
      this.numeroVol = event.value.toUpperCase();
    }

    this.resetFlightDetailsDisplay();
    this.resetPaxZoneMessages();
  }


  afficher1Vol() {
    this.resetFlightDetailsDisplay();
    this.resetInputZoneMessages();
    this.resetPaxZoneMessages();

    // Un tableau d'objets JSon est attendu
    let url_date = this.url_base_serveur + this.date_yyyy_mm_dd;
    let url_numeroVol = url_date + "/" + this.numeroVol.toLowerCase();
    
    // Cas de vols demo
    if (this.numeroVol == "DEM01"|| this.numeroVol == "DEM02" ||
        this.numeroVol == "DEM03" || this.numeroVol == "DEM04") {

      url_numeroVol = this.url_demo_pl;

    } else if (this.numeroVol == "DEM05"|| this.numeroVol == "DEM06" ||
                this.numeroVol == "DEM13" || this.numeroVol == "DEM14") {
      
      url_numeroVol = this.url_demo_de;
    }

    /* A FAIRE: VERIFS AVANT REQUETE */
    if (this.date_yyyy_mm_dd == "NONE") {
      // ERREUR: date non choisie

    } else if (this.numeroVol.toUpperCase() == "NONE" ||
                this.numeroVol == "") {
      // ERREUR: numero-vol non fourni
      this.messageErreurNumeroVide = "ERROR: no flight number provided. Type a flight number.";

    } else {
      // On passe la requete
      
      this.messageStatut = "STATUS: Waiting ...";

      // On effectue la requete HTTP pour obtenir un tableau de IVol
      this.serviceVols.getFlights(url_numeroVol).subscribe(
        (data: IVol[]) => this.listeVols_dispo = data);

      // Apres 3 secondes, on verifie les donnees (timeout version rxjs)
      timer(3000).subscribe(
        x => {
          if (this.listeVols_dispo == undefined) {
            // En cas d'erreur

            this.messageStatut = "STATUS: No response received.";
            this.messageErreurDetails = VolsService.error_message;

          } else {
          // En cas de succes

            const nombre_vols = this.listeVols_dispo.length;
            this.messageStatut = "STATUS: Success";

            let vol: IVol | undefined;
            let i = 0;
            
            while (i < nombre_vols) {
              
              vol = this.listeVols_dispo[i];
              
              if (vol.numeroVol == this.numeroVol){
                this.objetVol = vol;
              }
              i++;
            }
            
            // On affiche le tarif
            this.calculerAfficherTarif();
          }
        }
      )
    }
  }


  calculerAfficherTarif(){
    this.fareCost = "120 PLN";
    /* A FAIRE: Autres calculs prenant en comptes les differents cas possibles */
  }


  confirmerReservation(){

    this.resetInputZoneMessages();
    this.resetPaxZoneMessages();

    if (this.objetVol == undefined) {
      
      this.message_erreur_reservation = "ERROR: No flight found." +
        "Choose a date, type a flight number & click the display details button above.";
      
    } else {

      const nombreReservationsDispo = ReservationService.getNombreToutesReservations();
      const nouveauNumeroReservation = this.prefixeTicket + (nombreReservationsDispo + 1);

      let newReservationObject = new ReservationModel();

      newReservationObject.dateVol = this.objetVol.dateHeure;
      newReservationObject.numeroReservation = nouveauNumeroReservation;
      newReservationObject.flightNumber = this.objetVol.numeroVol;
      newReservationObject.paxName = this.paxName;
      newReservationObject.paxSurname = this.paxSurname;
      newReservationObject.fare = this.fareCost;
      newReservationObject.isTicketPaid = this.isTicketPaid;

      ReservationService.ajouterReservation(newReservationObject);
      
      this.message_succes_reservation = "Success. Your reservation number is:";
      this.newReservationNumber = nouveauNumeroReservation;
    }


  }


  resetFlightDetailsDisplay(){
    //Reinitialisation de variables

    this.listeVols_dispo = undefined;
    this.objetVol = undefined;
    this.messageErreurDetails = "";
    this.messageStatut = "";
    this.fareCost = "";
    this.newReservationNumber = "";
    VolsService.error_message = "";
  }


  // Pax = passenger in travel jargon
  onPaxNamesChange(event: any){

    this.paxName = event.value.toUpperCase();
    this.resetInputZoneMessages();
    this.resetPaxZoneMessages();
  }


  onPaxSurnameChange(event: any){

    this.paxSurname = event.value.toUpperCase();
    this.resetInputZoneMessages();
    this.resetPaxZoneMessages();
  }


  resetInputZoneMessages(){

    this.messageErreurDetails = "";
    this.messageStatut = "";
    this.messageErreurNumeroVide = "";
  }


  resetPaxZoneMessages(){
    
    this.message_erreur_reservation = "";
    this.message_succes_reservation = "";
    this.newReservationNumber = "";
  }
}
