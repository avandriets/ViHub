import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {ElementVi, TransportObject, MessageVi, NoteVi} from '../Utility/base-classes';
import {Router} from '@angular/router';
import {ViewMessageDialogComponent} from "../Dialogs/view-message-dialog.component";
import {EditNoteDialogComponent} from "../Dialogs/edit-note-dialog.component";
import {DeleteNoteDialogComponent} from "../Dialogs/delete-note-dialog.component";

@Component({
    selector: 'notes-list',
    templateUrl: '/static/app/Components/notes-list.component.html',
})
export class NotesListComponent {

    error: any;
    @Input() localNotes: NoteVi[] = [];
    @Input() editNoteDialog: EditNoteDialogComponent;
    @Input() deleteNoteDialog: DeleteNoteDialogComponent;
    //@Input() addNoteDialog

    constructor(private elementService: ElementsService, private router: Router) {
    }

    onViewNoteClick(currentNote: NoteVi): void {
        this.editNoteDialog.initDialog(currentNote, false);
        this.editNoteDialog.openDialog();
    }

    onEditNoteClick(currentNote: NoteVi): void {
        this.editNoteDialog.initDialog(currentNote, true);
        this.editNoteDialog.openDialog();
    }

    onDeleteNoteClick(currentNote: NoteVi): void {
        this.deleteNoteDialog.initDialog(currentNote);
        this.deleteNoteDialog.openDialog();
    }
}
