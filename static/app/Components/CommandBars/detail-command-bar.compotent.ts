import {Component, ViewChild, Input} from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import {WindowRef} from '../../Utility/WindowRef';
import {ElementsService} from '../../Utility/elements.service';
import {BaseCommandBar} from "../../Utility/BaseCommandBar";
import {AddElementDialogComponent} from "../../Dialogs/add-element-dialog.component";
import {ElementVi, BaseObject, TransportObject} from "../../Utility/base-classes";
import {EditElementDialogComponent} from "../../Dialogs/edit-element-dialog.component";
import {DeleteElementDialogComponent} from "../Elements/delete-element-dialog.component";
import {AddMessageDialogComponent} from "../../Dialogs/add-message-dialog.component";
import {AddNoteDialogComponent} from "../../Dialogs/add-note-dialog.component";
import {ViewMemberDialogComponent} from "../Members/view-members-dialog.component";
import {AddMemberDialogComponent} from "../Members/add-member-dialog.component";

@Component({
    selector: 'detail-command-bar',
    templateUrl: '/static/app/Components/CommandBars/detail-command-bar.component.html',
})

export class DetailCommandBarComponent extends BaseCommandBar {

    @Input() currentElement: ElementVi;
    @Input() addNoteDialogLocal: AddNoteDialogComponent;
    @Input() memberViewDlg: ViewMemberDialogComponent;
    @Input() addMemberDialog: AddMemberDialogComponent;

    @Output() onDataChange = new EventEmitter<TransportObject>();

    @ViewChild(AddElementDialogComponent) addElementDialog: AddElementDialogComponent;
    @ViewChild(EditElementDialogComponent) editElementDialog: EditElementDialogComponent;
    @ViewChild(DeleteElementDialogComponent) deleteElementDialog: DeleteElementDialogComponent;
    @ViewChild(AddMessageDialogComponent) addMessageDialog: AddMessageDialogComponent;

    getEventEmitter(): any {
        return this.onDataChange;
    }

    constructor(private elementService: ElementsService, private winRef: WindowRef) {
        super();
    }

    onClickCreateElement(): void {
        this.addElementDialog.openDialog();
    }

    onClickEditElement(): void {
        this.editElementDialog.openDialog();
    }

    onClickDeleteElement(): void {
        this.deleteElementDialog.openDialog();
    }

    onClickAddMessageDialog(): void {
        this.addMessageDialog.openDialog();
    }

    onClickAddNoteDialog(): void {
        this.addNoteDialogLocal.initDialog(null);
        this.addNoteDialogLocal.openDialog();
    }

    onClickMembersView(): void {
        this.memberViewDlg.initDialog();
        this.memberViewDlg.openDialog();
    }

    onClickAddMember() : void{
        this.addMemberDialog.initDialog();
        this.addMemberDialog.openDialog();
    }
}
