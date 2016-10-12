import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';

import {Element, Favorite} from './element';
import {ElementsService} from './Utility/elements.service';
import {WindowRef} from './Utility/WindowRef';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

    elementsSet: Element[] = [];

    favoriteSet: Favorite[] = [];
    error: any;
    constructor(private router: Router,
                private elementService: ElementsService, private winRef: WindowRef) {
    }

    ngOnInit(): void {
        this.getData();
    }

    ngAfterViewInit(): void {

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

    getData(): void {

        this.elementService.getElements(-1).then((elements) => {
            this.elementsSet = elements;
        }).catch((error)=> {
            console.log(error);
            this.error = error;
        });
        this.elementService.getFavorite().then((favorites) => {
            this.favoriteSet = favorites;
        }).catch((error)=> {
            console.log(error);
            this.error = error;
        });

    }

    onDataChange(): void {
        this.getData();
    }

    gotoDetail(element: Element): void {
        let link = ['/element', element.id];
        this.router.navigate(link);
    }
}

