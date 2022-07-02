import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/route';
import childrenRoutes from './childrenRoutes';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  routes: Array<RouteModel> = [
    {
      id: 'hm-route',
      icon: 'home',
      path: '/home',
      title: 'Inicio',
    },
    {
      id: 'profile-route',
      icon: 'portrait',
      path: '/admin',
      title: 'Perfil',
      policies: ["public"],
    },
    {
      id: 'statement-route',
      icon: 'library_books',
      path: '/statement',
      title: 'Estado de cuenta',
      policies: ["public"],
    },
    {
      id: 'admin-routes',
      icon: 'pages',
      children: childrenRoutes,
      path: '',
      title: 'Admin',
      policies: ["admin"],
    },
    {
      id: 'lo',
      icon: 'power_settings_new',
      title: 'Cerrar sesión',
      path: '/sign-in',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
