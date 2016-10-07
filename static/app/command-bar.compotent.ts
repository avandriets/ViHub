/**
 * Created by AVAndriets on 04.10.16.
 */
import {Component, ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {AddElementDialogComponent} from './add-element-dialog.component'


@Component({
    selector: 'command-bar',
    templateUrl: '/static/app/command-bar.component.html',
})

export class CommandBarComponent implements AfterViewInit {

    window_fabric: any;

    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent


    onClickShowDialog(): void {
        console.log('Add hub click');
        this.addDialog.openDialog();
    }

    ngAfterViewInit(): void {

        this.window_fabric = window.fabric;

        var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
        for (var i = 0; i < CommandButtonElements.length; i++) {
            new this.window_fabric['CommandButton'](CommandButtonElements[i]);
        }

        var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        for (var i = 0; i < CommandBarElements.length; i++) {
            new this.window_fabric['CommandBar'](CommandBarElements[i]);
        }

        var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
        for (var i = 0; i < DropdownHTMLElements.length; ++i) {
            var Dropdown = new this.window_fabric['Dropdown'](DropdownHTMLElements[i]);
        }

        var PanelExamples = document.getElementsByClassName("ms-PanelExample");
        for (var i = 0; i < PanelExamples.length; i++) {

            (function () {
                var PanelExampleButton = PanelExamples[i].querySelector(".ms-CommandButton-button");
                var PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");
                PanelExampleButton.addEventListener("click", function (i) {
                    new window.fabric['Panel'](PanelExamplePanel);
                });
            }());
        }
    }
}
