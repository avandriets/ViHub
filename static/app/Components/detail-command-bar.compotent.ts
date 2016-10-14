import {Component, ViewChild, Input} from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import { WindowRef } from '../Utility/WindowRef';
import {ElementsService} from '../Utility/elements.service';
import {BaseCommandBar} from "../Utility/BaseCommandBar";
import {AddElementDialogComponent} from "../Dialogs/add-element-dialog.component";
import {ElementVi, BaseObject, TransportObject} from "../Utility/base-classes";
import {EditElementDialogComponent} from "../Dialogs/edit-element-dialog.component";
import {DeleteElementDialogComponent} from "../Dialogs/delete-element-dialog.component";
import {AddMessageDialogComponent} from "../Dialogs/add-message-dialog.component";
import {AddNoteDialogComponent} from "../Dialogs/add-note-dialog.component";

@Component({
    selector: 'detail-command-bar',
    templateUrl: '/static/app/Components/detail-command-bar.component.html',
})

export class DetailCommandBarComponent extends BaseCommandBar {

    @Input() currentElement: ElementVi;

    @Output() onDataChange = new EventEmitter<TransportObject>();

    @ViewChild(AddElementDialogComponent) addElementDialog: AddElementDialogComponent;
    @ViewChild(EditElementDialogComponent) editElementDialog: EditElementDialogComponent;
    @ViewChild(DeleteElementDialogComponent) deleteElementDialog: DeleteElementDialogComponent;
    @ViewChild(AddMessageDialogComponent) addMessageDialog: AddMessageDialogComponent;
    @ViewChild(AddNoteDialogComponent) addNoteDialog: AddMessageDialogComponent;

    getEventEmitter(): any {
        return this.onDataChange;
    }

    constructor(private elementService: ElementsService, private winRef: WindowRef) {
        super();
    }

    onClickCreateElement() :void{
        this.addElementDialog.openDialog();
    }

    onClickEditElement() :void{
        this.editElementDialog.openDialog();
    }

    onClickDeleteElement() :void{
        this.deleteElementDialog.openDialog();
    }

    onClickAddMessageDialog() :void{
        this.addMessageDialog.openDialog();
    }

    onClickAddNoteDialog() :void{
        this.addNoteDialog.openDialog();
    }
}
