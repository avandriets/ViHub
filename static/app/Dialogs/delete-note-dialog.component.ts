import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi, IsOwnerReadOnlyPermission} from "../Utility/base-classes";


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

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
        this.currentNote = new NoteVi();
    }

    getCurrentObject(): BaseObject {
        return this.currentNote;
    }

    initDialog(note: NoteVi): void {
        this.currentNote = Object.assign({}, note);
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteNoteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    onDeleteNoteDialog(): void {
        this.inProcess = true;

        this.elementService.deleteNote(this.currentNote)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onDeleteNote.emit(trsObj);

                this.errorMessage = '';
                this.hasError = false;

                this.inProcess = false;

                this.closeDialog();
            })
            .catch((error) => {
                this.errorMessage = error;
                if (error.json().detail)
                    this.errorMessage = error.json().detail;

                this.hasError = true;

                this.inProcess = false;
            });
    }
}
