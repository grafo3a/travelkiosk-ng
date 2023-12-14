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

  listeVolsDispo: IVol[] | undefined;
  dateYyyyMmDd = "None";    // La valeur du datepicker
  urlBaseServeur = "http://localhost:8080/flischeklowa/vols-rest/json/";
  urlDemoPL = "../../assets/demo_vols_pl.json";
  urlDemoDE = "../../assets/demo_vols_de.json";
  url = "";
  messageErreur = "";
  messageStatut = "";
  messageWarningCasDemo = "";
  codePays = "PL";
  codeDemoPL = "PL_Demo";
  codeDemoDE = "DE_Demo";


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

    this.dateYyyyMmDd = year + "-" + month_string + "-" + day_string;
    this.resetFlightsListDisplay();

    /*
    if (this.codePays.endsWith("DEMO")) {
      this.messageWarningDateVide =
        "Warning: all demo cases display flights with the same date: 2050-01-01.";      
    }
    */
  }

  
  onFlightsCategorySelectionChange(event: any){
    this.resetFlightsListDisplay();
    this.codePays = event.value.toUpperCase();    /* on affecte la nouvelle valeur choisie */

    if (this.codePays.endsWith("DEMO")) {
      this.messageWarningCasDemo = "Warning: all demo flights have the date 2050-01-01";      
    
    } else {
      this.messageWarningCasDemo = "";
    }
  }


  resetFlightsListDisplay(){
    //Reinitialisation de toutes les variables affichables
    
    this.listeVolsDispo = undefined;
    this.messageErreur = "";
    this.messageStatut = "";
    VolsService.errorMessage = "";
  }


  afficherVols() {
    // Cas de plusieurs objets JSon attendus

    this.resetFlightsListDisplay();

    if (this.dateYyyyMmDd.toUpperCase() == "NONE") {
      this.messageErreur = "ERROR: no date chosen. pick a date.";

    } else {
      
      let url_date = this.urlBaseServeur + this.dateYyyyMmDd;
      const codePaysVols = this.getFlightsCountry();
      
      if (codePaysVols == this.codeDemoPL) {
        url_date = this.urlDemoPL;
      
      } else if (codePaysVols == this.codeDemoDE) {
        url_date = this.urlDemoDE;
      
      } else {
        url_date = url_date + "/" + this.codePays.toLowerCase();
      }
      
      this.messageStatut = "STATUS: Waiting ...";
      
      // On effectue la requete HTTP pour obtenir un tableau de IVol
      this.serviceVols.getFlights(url_date)
        .subscribe((data: IVol[]) => this.listeVolsDispo = data);
      
      // Apres 3 secondes, on verifie les donnees (timeout version rxjs)
      timer(3000).subscribe(x => {
          
          if (this.listeVolsDispo == undefined) {
            
            this.messageStatut = "STATUS: No response received.";
            this.messageErreur = VolsService.errorMessage;
          
          } else {
            
            const nombre_vols = this.listeVolsDispo.length;
            this.messageStatut = "STATUS: Success (" + nombre_vols + " flights found)";
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
    
    this.codePays = paysVols.toUpperCase();
    return paysVols;
  }
}
