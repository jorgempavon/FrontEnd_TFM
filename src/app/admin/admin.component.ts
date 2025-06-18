import { Component } from '@angular/core';
import { DynamicNavLink } from '../shared/dtos/dynamicNavLink';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  profileUrl:string = 'bibliokie/admin/profile';
  listNavs: DynamicNavLink[] = [
    { title: 'Gestión Libros', href: 'bibliokie/admin/books', text: 'Libros', isActive:false},
    { title: 'Gestión Eventos', href: 'bibliokie/admin/rules', text: 'Eventos', isActive:false},
    { title: 'Gestión Usuarios', href: 'bibliokie/admin/users', text: 'Usuarios', isActive:false},
    { title: 'Gestión Reglas', href: 'bibliokie/admin/rules', text: 'Reglas', isActive:false},
  ];
}
