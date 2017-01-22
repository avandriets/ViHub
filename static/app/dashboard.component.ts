import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ElementVi, Favorite, TransportObject} from './Utility/base-classes';
import {ElementsService} from './Utility/elements.service';
import {WindowRef} from './Utility/WindowRef';
import {AddElementPanelComponent} from "./Components/Elements/add-element-panel.component";

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

    @ViewChild(AddElementPanelComponent) addPanelObject: AddElementPanelComponent;
    elementsSet: ElementVi[] = [];

    favoriteSet: Favorite[] = [];
    error: any;
    loading: boolean = true;
    spinnerText: string = "Загрузка данных ...";

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
            this.loading = false;
        }).catch((error) => {
            console.log(error);
            this.error = error;
            this.loading = false;
        });
        this.elementService.getFavorite().then((favorites) => {
            this.favoriteSet = favorites;
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });

    }

    onDataChange(changerData: TransportObject): void {
        console.log("DashboardComponent onDataChange");
        this.getData();
    }

    gotoDetail(element: ElementVi): void {
        let link = ['/element', element.id];
        this.router.navigate(link);
    }

    openAddElement(): void {
        this.addPanelObject.openPanel();
    }
}

