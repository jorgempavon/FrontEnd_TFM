import { Component } from '@angular/core';
import { DynamicNavLink } from '../shared/dtos/dynamicNavLink';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clientUrl:string = 'bibliokie/client'
  profileUrl:string = this.clientUrl + '/profile';
  listNavs: DynamicNavLink[] = [
    { title: 'Libros', href: this.clientUrl+'/books', text: 'Libros', isActive:false},
    { title: 'Eventos', href: this.clientUrl+'/events', text: 'Eventos', isActive:false},
    { title: 'Mis penalizaciones', href: this.clientUrl+'/penalties', text: 'Penalizaciones', isActive:false},
    { title: 'Mis reservas', href: this.clientUrl+'/bookingLoans', text: 'Reservas', isActive:false},
  ];
  constructor(){}

}
