import { Component, Inject, OnInit } from '@angular/core';
import { VolsService } from '../services/vols.service';
import { IVol } from '../models/ivol.model';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { timer } from 'rxjs';
import { MenusService } from '../services/menus.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listeVols_dispo: IVol[] | undefined;
  date_yyyy_mm_dd = "None";    // La valeur du datepicker
  url_base_serveur = "http://localhost:8080/flischeklowa/vols-rest/json/";
  url_demo_pl = "../../assets/demo_vols_pl.json";
  url_demo_de = "../../assets/demo_vols_de.json";
  url = "";
  message_erreur = "";
  message_statut = "";
  messageWarningCasDemo = "";
  code_pays = "PL";
  code_demo_pl = "PL_Demo";
  code_demo_de = "DE_Demo";


  constructor(
    // On cree une instance pour chaque service qu'on va utiliser
    private serviceVols: VolsService,
    private serviceMenus: MenusService,
    
    // Pour le datepicker
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ){}


  ngOnInit(): void {

    // On colore l'element actif par defaut
    this.serviceMenus.updateActiveComponent("option01Home");

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
    this.resetFlightsListDisplay();

    /*
    if (this.code_pays.endsWith("DEMO")) {
      this.messageWarningDateVide =
        "Warning: all demo cases display flights with the same date: 2050-01-01.";      
    }
    */
  }

  
  onFlightsCategorySelectionChange(event: any){
    this.resetFlightsListDisplay();
    this.code_pays = event.value.toUpperCase();    /* on affecte la nouvelle valeur choisie */

    if (this.code_pays.endsWith("DEMO")) {
      this.messageWarningCasDemo = "Warning: all demo flights have the date 2050-01-01";      
    
    } else {
      this.messageWarningCasDemo = "";
    }
  }


  resetFlightsListDisplay(){
    //Reinitialisation de toutes les variables affichables
    
    this.listeVols_dispo = undefined;
    this.message_erreur = "";
    this.message_statut = "";
    VolsService.error_message = "";
  }


  afficherVols() {
    // Cas de plusieurs objets JSon attendus

    this.resetFlightsListDisplay();

    if (this.date_yyyy_mm_dd.toUpperCase() == "NONE") {
      this.message_erreur = "ERROR: no date chosen. pick a date.";

    } else {
      
      let url_date = this.url_base_serveur + this.date_yyyy_mm_dd;
      const codePaysVols = this.getFlightsCountry();
      
      if (codePaysVols == this.code_demo_pl) {
        url_date = this.url_demo_pl;
      
      } else if (codePaysVols == this.code_demo_de) {
        url_date = this.url_demo_de;
      
      } else {
        url_date = url_date + "/" + this.code_pays.toLowerCase();
      }
      
      this.message_statut = "STATUS: Waiting ...";
      
      // On effectue la requete HTTP pour obtenir un tableau de IVol
      this.serviceVols.getFlights(url_date)
        .subscribe((data: IVol[]) => this.listeVols_dispo = data);
      
      // Apres 3 secondes, on verifie les donnees (timeout version rxjs)
      timer(3000).subscribe(x => {
          
          if (this.listeVols_dispo == undefined) {
            
            this.message_statut = "STATUS: No response received.";
            this.message_erreur = VolsService.error_message;
          
          } else {
            
            const nombre_vols = this.listeVols_dispo.length;
            this.message_statut = "STATUS: Success (" + nombre_vols + " flights found)";
          }
        }
      )
    }
  }


  getFlightsCountry(): String {

    let paysVols = "PL";
    const comboBoxContent = document.getElementById('paysVols') as HTMLInputElement | null;

    if (comboBoxContent != null) {
      paysVols = comboBoxContent.value;
    }
    
    this.code_pays = paysVols.toUpperCase();
    return paysVols;
  }
}
