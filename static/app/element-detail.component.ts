import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location}               from '@angular/common';
import {ElementVi, TransportObject, MessageVi, NoteVi} from './Utility/base-classes'
import {ElementsService} from './Utility/elements.service'
import {WindowRef} from './Utility/WindowRef';
import {ViewMessageDialogComponent} from "./Dialogs/view-message-dialog.component";


@Component({
    selector: 'element-detail',
    templateUrl: '/static/app/element-detail.component.html'
})

export class ElementDetailComponent implements OnInit, AfterViewInit {

    element: ElementVi;

    elementsSet: ElementVi[] = [];
    messagesSet: MessageVi[] = [];
    notesSet: NoteVi[] = [];
    breadcrumbs: ElementVi[] = [];

    @ViewChild(ViewMessageDialogComponent) viewMessageDialog: ViewMessageDialogComponent;

    error: any;

    constructor(private elementService: ElementsService,
                private route: ActivatedRoute,
                private location: Location,
                private winRef: WindowRef) {
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

    ngOnInit(): void {

        //this.viewMessageDialog.openDialog();

        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.elementService.getElementById(id).then(
                (element) => {
                    this.element = element;
                    this.getData();
                    this.getBeadCrumbs();
                }
            );
        });
    }

    private getBeadCrumbs() {
        this.elementService.getBreadcrumbs(this.element.element)
            .then((retCrumbs) => {
                this.breadcrumbs = retCrumbs;
            }).catch((error)=> {
            this.error = error;
        });
    }

    getData(): void {
        this.elementService.getElements(this.element.element)
            .then((retElements) => {
                this.elementsSet = retElements;
            }).catch((error)=> {
            this.error = error;
        });

        this.elementService.getMessages(this.element.element)
            .then((retMessages) => {
                this.messagesSet = retMessages;
            }).catch((error)=> {
            this.error = error;
        });

        this.elementService.getNotes(this.element.element)
            .then((retNotes) => {
                this.notesSet = retNotes;
            }).catch((error)=> {
            this.error = error;
        });
    }

    dataChange(changerData: TransportObject): void {
        this.getData();
    }
}