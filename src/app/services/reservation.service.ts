import { Injectable, OnInit } from '@angular/core';
import { ReservationModel } from '../models/reservation.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // Un tableau de IReservation (vide)
  static listeReservations: ReservationModel[] = [];


  constructor() {}


  public static ajouterReservation(objetReservation: ReservationModel){
    this.listeReservations.push(objetReservation);
  }


  public static getReservationFromList(numeroReservationFourni: string): any {

    let bonneReservation: ReservationModel | undefined;

    for (const elementListe of this.listeReservations) {

      if (elementListe.numeroReservation == numeroReservationFourni) {
        bonneReservation = elementListe;
      }
    }

    return bonneReservation;
  }


  public static getNombreToutesReservations(): number {
    
    const nombreElements = ReservationService.listeReservations.length;
    return nombreElements;
  }
}
