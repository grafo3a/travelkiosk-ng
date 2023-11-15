import { Component, OnInit } from '@angular/core';
import { PrevisionMeteoChService } from '../services/prevision-meteo-ch.service';
import { Observable, Observer, timer } from 'rxjs';


@Component({
  selector: 'app-nice-header',
  templateUrl: './nice-header.component.html',
  styleUrls: ['./nice-header.component.css']
})
export class NiceHeaderComponent implements OnInit {

  appTitle = 'TravelKiosk';
  infosMeteo = "";

  // Info async (donnees arrivant en retard)
  asyncTime = new Observable<string>((observer: Observer<string>) => {

    // D'abord la 1ere fois, en suite les autres fois en boucle
    observer.next(new Date().toString());
    setInterval(() => observer.next(new Date().toString()), 1000);
  });


  // Injection des services via le constructeur
  // On cree une instance pour chaque service qu'on va utiliser
  constructor(private meteoService: PrevisionMeteoChService){}


  async ngOnInit(): Promise<void> {

    // Affichage des infos meteo
    this.infosMeteo = this.meteoService.getWeatherStatus();
    
    // timeout version rxjs (affiche la valeur preparee par l'execution precedente)
    timer(1000).subscribe(x => { this.infosMeteo = this.meteoService.getWeatherStatus(); })
  }
}
