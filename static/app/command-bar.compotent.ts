/**
 * Created by AVAndriets on 04.10.16.
 */
import {Component, ViewChild, Input} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {AddElementDialogComponent} from './add-element-dialog.component'
import { WindowRef } from './WindowRef';
import {ElementsService} from './elements.service';

@Component({
    selector: 'command-bar',
    templateUrl: '/static/app/command-bar.component.html',
})

export class CommandBarComponent implements AfterViewInit {

    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent

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

    onClickShowPanel() : void{

        //TODO панель удаляется после закрытия т/е/ непорядок
        var PanelExamples = document.getElementsByClassName("ms-PanelExample");
        var PanelExamplePanel = PanelExamples[0].querySelector(".ms-Panel");

        new this.winRef.nativeWindow.fabric['Panel'](PanelExamplePanel);

        // //Поменять подписку на событие вызвать диалог т/е/ перенести это
        // var PanelExamples = document.getElementsByClassName("ms-PanelExample");
        // for (var i = 0; i < PanelExamples.length; i++) {
        //
        //     (function () {
        //         var PanelExampleButton = PanelExamples[i].querySelector(".ms-CommandButton-button");
        //         var PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");
        //         PanelExampleButton.addEventListener("click", function (i) {
        //             new this.winRef.nativeWindow.fabric['Panel'](PanelExamplePanel);
        //         });
        //     }());
        // }
    }

    ngAfterViewInit(): void {

        var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
        for (var i = 0; i < CommandButtonElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
        }

        var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        for (var i = 0; i < CommandBarElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
        }

        var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
        for (var i = 0; i < DropdownHTMLElements.length; ++i) {
            var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
        }
    }
}
