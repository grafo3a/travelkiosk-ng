import { Injectable, OnInit } from '@angular/core';
import { ReservationModel } from '../models/reservation.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // Un tableau de IReservation (vide)
  private static listeReservations: ReservationModel[] = [];
  private static readonly prefixeTicket = "TICKET_PAX_";

  
  constructor() {}


  /** Ajout d'une reservation sur la liste */
  public static ajouterReservation(objetReservation: ReservationModel){
    this.listeReservations.push(objetReservation);
  }


  /** Recherche d'un objet reservation sur base d'un numero de reservation fourni */
  public static getReservationFromList(numeroReservationFourni: string): ReservationModel {

    let bonneReservation: ReservationModel = new ReservationModel;

    for (const elementListe of this.listeReservations) {

      if (elementListe.numeroReservation == numeroReservationFourni) {
        bonneReservation = elementListe;
      }
    }

    return bonneReservation;
  }


  /** Paiement sur base d'un numero de reservation */
  public static effectuerPaiementTicket(numeroReservationFourni: string) {

    const nombreReservations = ReservationService.listeReservations.length;
    let i = 0;

    while (i < nombreReservations) {
      let reservationActuelle: ReservationModel = ReservationService.listeReservations[i];

      if (reservationActuelle.numeroReservation == numeroReservationFourni){
        //La reservation actuelle est la bonne

        ReservationService.listeReservations[i].isTicketPaid = true;
        i = nombreReservations;
      }

      i++;
    }
  }


  /** Obtention d'une liste de reservations */
  public static getNombreToutesReservations(): number {
    
    const nombreElements = ReservationService.listeReservations.length;
    return nombreElements;
  }


  /** Accesseur pour prefixeTicket */
  public static getPrefixeTicket(): string {
    return this.prefixeTicket;
  }
}
