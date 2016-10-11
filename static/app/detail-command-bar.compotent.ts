import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { WindowRef } from './WindowRef';
import {ElementsService} from './elements.service';

@Component({
    selector: 'detail-command-bar',
    templateUrl: '/static/app/detail-command-bar.component.html',
})

export class DetailCommandBarComponent implements OnInit {

    constructor(private elementService: ElementsService, private winRef: WindowRef) {}

    ngOnInit(): void {

        // var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
        // for (var i = 0; i < CommandButtonElements.length; i++) {
        //     new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
        // }
        //
        // var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        // for (var i = 0; i < CommandBarElements.length; i++) {
        //     new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
        // }
        //
        // var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
        // for (var i = 0; i < DropdownHTMLElements.length; ++i) {
        //     var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
        // }
    }

    onClickCreateElement() :void{
        console.log("Create element click");
    }
}
