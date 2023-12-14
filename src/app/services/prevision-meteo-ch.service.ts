import { Injectable } from '@angular/core';
import { IweatherreportService } from './iweatherreport.service';
import { IweatherdataModel } from '../models/iweatherdata.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrevisionMeteoChService implements IweatherreportService {

  // Coordonnees gps de Geneve (pour demo)
  urlMeteo = "https://www.prevision-meteo.ch/services/json/lat=46.2lng=6.1667";
  dataModel: IweatherdataModel | undefined;

  
  // On cree une instance pour chaque service qu'on va utiliser
  constructor(private http : HttpClient) {}


  getWeatherStatus(): string {

    const info = this.getWeatherData().subscribe(
      (data: IweatherdataModel) => this.dataModel = data);
    
    return this.dataModel?.current_condition.tmp.toString() + " \u2103";    // degrEs celcius
  }
  
  
  getWeatherData(): Observable<IweatherdataModel> {
    return this.http.get<IweatherdataModel>(this.urlMeteo);
  }
}
