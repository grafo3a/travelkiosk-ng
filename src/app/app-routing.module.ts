import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInfoComponent } from './app-info/app-info.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TicketComponent } from './ticket/ticket.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {path: 'home-route', component: HomeComponent},
  {path: 'reservation-route', component: ReservationComponent},
  {path: 'payment-route', component: PaymentComponent},
  {path: 'ticket-route', component: TicketComponent},
  {path: 'contact-route', component: ContactComponent},
  {path: 'app-info-route', component: AppInfoComponent},
  {path: '', component: HomeComponent},
];


/**
 * Ce module gere les routes Angular.
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
