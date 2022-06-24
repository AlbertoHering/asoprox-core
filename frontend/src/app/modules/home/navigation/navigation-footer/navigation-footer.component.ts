import { Component, Input, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/route';

@Component({
  selector: 'app-navigation-footer',
  templateUrl: './navigation-footer.component.html',
  styleUrls: ['./navigation-footer.component.scss'],
})
export class NavigationFooterComponent implements OnInit {
  @Input() routes: Array<RouteModel> | undefined;

  constructor() {}

  ngOnInit() { }
}
