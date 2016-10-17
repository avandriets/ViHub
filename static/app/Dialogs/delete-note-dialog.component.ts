import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi} from "../Utility/base-classes";


@Component({
    selector: 'delete-note-dialog',
    templateUrl: '/static/app/Dialogs/delete-note-dialog.component.html',
})

export class DeleteNoteDialogComponent extends BaseDialog {

    @Output() onDeleteNote = new EventEmitter<TransportObject>();
    currentNote: NoteVi;

    getEventEmitter(): any {
        return this.onDeleteNote;
    }

    constructor(private elementService: ElementsService, public winRef: WindowRef) {
        super(winRef);
        this.currentNote = new NoteVi();
    }

    initDialog(note: NoteVi): void {
        this.currentNote = Object.assign({},note);
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteNoteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    onDeleteNoteDialog(): void {

        this.elementService.deleteNote(this.currentNote)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onDeleteNote.emit(trsObj);

                this.errorMessage = '';
                this.hasError = false;

                this.closeDialog();
            })
            .catch((error) => {
                this.errorMessage = error;
                this.hasError = true;
            });

    }
}
