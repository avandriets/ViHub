/**
 * Created by AVAndriets on 04.10.16.
 */
import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {OnInit} from '@angular/core';
import {AddElementDialogComponent} from './add-element-dialog.component'
import { WindowRef } from './WindowRef';
import {ElementsService} from './elements.service';

@Component({
    selector: 'command-bar',
    templateUrl: '/static/app/command-bar.component.html',
})

export class CommandBarComponent implements OnInit {

    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent;

    @Output() onDataChange = new EventEmitter();

    constructor(private elementService: ElementsService, private winRef: WindowRef) {}

    onClickShowDialog(): void {
        this.addDialog.openDialog();
    }

    onCardViewClick() :void{
        this.elementService.cardView = true;
    }

    onTableViewClick() :void{
        this.elementService.cardView = false;
    }

    onLocalDataChange() :void{
        console.log("command bar date change");
        this.onDataChange.emit();
    }

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
}
