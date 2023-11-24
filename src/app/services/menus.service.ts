import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenusService {

  bgOrangeatre = "rgb(255, 180, 120)";    /* orangeatre */
  bgRougeatre = "#f5d6e0";    /* paleVioletRed 90%, la couleur par defaut */


  constructor() { }


  resetMenuColors() {

    // On reinitialise la couleur de chaque element du menu
    const option01Home = document.getElementById("option01Home") as HTMLElement;
    const option02Reservation = document.getElementById("option02Reservation") as HTMLElement;
    const option021Payment = document.getElementById("option021Payment") as HTMLElement;
    const option03Ticket = document.getElementById("option03Ticket") as HTMLElement;
    const option04Contact = document.getElementById("option04Contact") as HTMLElement;
    const option05Info = document.getElementById("option05Info") as HTMLElement;

    option01Home.style.backgroundColor = this.bgRougeatre;
    option02Reservation.style.backgroundColor = this.bgRougeatre;
    option021Payment.style.backgroundColor = this.bgRougeatre;
    option03Ticket.style.backgroundColor = this.bgRougeatre;
    option04Contact.style.backgroundColor = this.bgRougeatre;
    option05Info.style.backgroundColor = this.bgRougeatre;
  }


  updateActiveComponent(newComponentId: string) {
    
    // On colore le nouvel element actif du menu
    this.resetMenuColors();
    const activeComponent = document.getElementById(newComponentId) as HTMLElement;
    activeComponent.style.backgroundColor = this.bgOrangeatre;
  }
}
