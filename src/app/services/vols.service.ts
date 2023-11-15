import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IVol } from '../models/ivol.model';


@Injectable({
  providedIn: 'root'
})
export class VolsService {

  static error_message = "";


  constructor(private http:HttpClient) {}
  
  // Cette methode observe et retourne IVol[]. On peut s'y abonner.
  getFlights(url_date: string): Observable<IVol[]> {
    return this.http.get<IVol[]>(url_date).pipe(catchError(this.handleError));
  }


  // Traitement d'erreur
  handleError(error: HttpErrorResponse) {

    let error_text = "An ERROR occurred (Name: " + error.name + ". Message: " + error.message + ")";
    VolsService.error_message = error_text;

    return throwError(() => new Error(error_text));
  }
}
