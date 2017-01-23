import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {ElementVi, TransportObject, MessageVi} from '../../Utility/base-classes';
import {Router} from '@angular/router';
import {ViewMessageDialogComponent} from "../../Dialogs/view-message-dialog.component";
import {AddNoteDialogComponent} from "../../Dialogs/add-note-dialog.component";
import {EditMessagePanelComponent} from "./edit-message-panel.component";
import {DeleteMessageDialogComponent} from "./delete-message-dialog.component";
import {AddNotePanelComponent} from "../Notes/add-note-panel.component";

@Component({
    selector: 'messages-list',
    templateUrl: '/static/app/Components/Messages/messages-list.component.html',
})
export class MessagesListComponent {

    error: any;
    @Input() localMessages: MessageVi[] = [];
    // @Input() viewMessageDialog: ViewMessageDialogComponent;
    @Input() addNoteDialogLocal: AddNotePanelComponent;
    @Input() editMessageDialog: EditMessagePanelComponent;
    @Input() deleteMessageDialog: DeleteMessageDialogComponent;

    constructor(private elementService: ElementsService, private router: Router) {
    }

    // onViewMessageClick(currentMessage: MessageVi): void {
    //
    //     this.viewMessageDialog.initDialog(currentMessage);
    //     this.viewMessageDialog.openDialog();
    // }

    onAddNoteClick(message: MessageVi): void {
        this.addNoteDialogLocal.initDialog(message);
        this.addNoteDialogLocal.openPanel();
    }

    onEditMessageClick(currentNote: MessageVi): void {
        this.editMessageDialog.initDialog(currentNote, true);
        this.editMessageDialog.openPanel();
    }

    onDeleteMessageClick(currentNote: MessageVi): void {
        this.deleteMessageDialog.initDialog(currentNote);
        this.deleteMessageDialog.openDialog();
    }
}
