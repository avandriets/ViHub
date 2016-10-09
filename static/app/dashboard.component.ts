import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Element } from './element';
import { ElementsService } from './elements.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private elementService: ElementsService) {
  }

  ngOnInit(): void {
    this.elementService.getElements();
  }

  gotoDetail(element: Element): void {
    let link = ['/element', element.id];
    this.router.navigate(link);
  }
}

