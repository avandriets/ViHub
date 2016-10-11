import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Element} from './element';
import {ElementsService} from './elements.service';
import { WindowRef } from './WindowRef';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router,
                private elementService: ElementsService, private winRef: WindowRef) {
    }

    ngOnInit(): void {
        this.elementService.getElements(-1);
        this.elementService.getFavorite();

        var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        for (var i = 0; i < CommandBarElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
        }

        var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
        for (var i = 0; i < CommandButtonElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
        }

        var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
        for (var i = 0; i < DropdownHTMLElements.length; ++i) {
            var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
        }
    }

    gotoDetail(element: Element): void {
        let link = ['/element', element.id];
        this.router.navigate(link);
    }
}

