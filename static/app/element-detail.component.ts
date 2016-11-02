import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location}               from '@angular/common';
import {ElementVi, TransportObject, MessageVi, NoteVi} from './Utility/base-classes'
import {ElementsService} from './Utility/elements.service'
import {WindowRef} from './Utility/WindowRef';
import {ViewMessageDialogComponent} from "./Dialogs/view-message-dialog.component";
import {EditNoteDialogComponent} from "./Dialogs/edit-note-dialog.component";
import {DeleteNoteDialogComponent} from "./Dialogs/delete-note-dialog.component";
import {AddNoteDialogComponent} from "./Dialogs/add-note-dialog.component";
import {ViewMemberDialogComponent} from "./Components/view-members-dialog.component";
import {AddMemberDialogComponent} from "./Components/add-member-dialog.component";


@Component({
    selector: 'element-detail',
    templateUrl: '/static/app/element-detail.component.html'
})

export class ElementDetailComponent implements OnInit, AfterViewInit {

    hasError: boolean = false;
    errorMessage: string = "";
    error: any;

    element: ElementVi;

    elementsSet: ElementVi[] = [];
    messagesSet: MessageVi[] = [];
    notesSet: NoteVi[] = [];
    breadcrumbs: ElementVi[] = [];

    loading: boolean = true;
    spinnerText:string = "Загрузка данных ...";

    @ViewChild(ViewMessageDialogComponent) viewMessageDialog: ViewMessageDialogComponent;
    @ViewChild(EditNoteDialogComponent) editNoteDialog: EditNoteDialogComponent;
    @ViewChild(DeleteNoteDialogComponent) deleteNoteDialog: DeleteNoteDialogComponent;
    @ViewChild(AddNoteDialogComponent) addNoteDialog: AddNoteDialogComponent;
    @ViewChild(ViewMemberDialogComponent) membersViewDialog: ViewMemberDialogComponent;
    @ViewChild(AddMemberDialogComponent) addMemberDialog: AddMemberDialogComponent;

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
                this.loading = false;
            }).catch((error)=> {
            this.error = error;
            this.loading = false;
        });

        this.elementService.getMessages(this.element.element)
            .then((retMessages) => {
                this.messagesSet = retMessages;
                this.loading = false;
            }).catch((error)=> {
            this.error = error;
        });

        this.elementService.getNotes(this.element.element)
            .then((retNotes) => {
                this.notesSet = retNotes;
                this.loading = false;
            }).catch((error)=> {
            this.error = error;
        });

        console.log("Sync messages");

        this.elementService.syncMailMessages(this.element.element)
            .then(()=> {
                console.log("Ok sync");
                //TODO get messages from base
            })
            .catch((error)=> {
                this.error = error;
                let error_desc = this.error.json().result;
                if (error_desc == "InvalidAuthenticationToken") {
                    this.hasError = true;
                    this.errorMessage = "Время сеанса истекло.";

                    let return_host = this.winRef.nativeWindow.location.origin + '/connect/disconnect/';
                    //http://127.0.0.1:8000/connect/disconnect/
                    this.winRef.nativeWindow.location.href = 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' +
                    return_host;
                }
            });
    }

    dataChange(changerData: TransportObject): void {
        this.getData();
    }
}