import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TicketComponent } from './ticket/ticket.component';
import { ContactComponent } from './contact/contact.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { PrevisionMeteoChService } from './services/prevision-meteo-ch.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NiceHeaderComponent } from './nice-header/nice-header.component';
import { NiceFooterComponent } from './nice-footer/nice-footer.component';
import { NiceMainContentComponent } from './nice-main-content/nice-main-content.component';
import { PhotoCentreComponent } from './photo-centre/photo-centre.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservationComponent,
    TicketComponent,
    ContactComponent,
    AppInfoComponent,
    NiceHeaderComponent,
    NiceFooterComponent,
    NiceMainContentComponent,
    PhotoCentreComponent,
  ],
  

  imports: [
    BrowserModule,
    HttpClientModule,    // Pour les requetes HTTP
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    
    // ==== Pour le datePicker ====
    // BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule
    // =============================
  ],

  providers: [
    PrevisionMeteoChService    // injection du service importE plus haut.
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
