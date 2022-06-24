import { Component, Input, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/route';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent implements OnInit {
  @Input() routes: Array<RouteModel> | undefined;

  constructor() {}

  ngOnInit() {}
}
