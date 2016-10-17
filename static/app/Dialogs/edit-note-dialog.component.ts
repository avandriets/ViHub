import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi} from "../Utility/base-classes";


@Component({
    selector: 'edit-note-dialog',
    templateUrl: '/static/app/Dialogs/edit-note-dialog.component.html',
})

export class EditNoteDialogComponent extends BaseDialog {

    @Output() onSaveNote = new EventEmitter<TransportObject>();
    currentNote: NoteVi;
    editMode: boolean;

    getEventEmitter(): any {
        return this.onSaveNote;
    }

    constructor(private elementService: ElementsService, public winRef: WindowRef) {
        super(winRef);
        this.currentNote = new NoteVi();
    }

    initDialog(note: NoteVi, edit: boolean): void {
        this.currentNote = Object.assign({},note);
        this.editMode = edit;
    }

    initComponent(): void {
        let dialog = document.querySelector("#editNoteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    onSaveNoteDialog(): void {

        this.currentNote.subject = this.currentNote.subject.trim();
        this.currentNote.body = this.currentNote.body.trim();

        if (this.currentNote.subject == null || this.currentNote.subject == ' ' || this.currentNote.subject.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните заголовок.';
            return;
        }

        if (this.currentNote.body == null || this.currentNote.body == ' ' || this.currentNote.body.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        this.elementService.editNote(this.currentNote)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onSaveNote.emit(trsObj);

                this.currentNote.subject = '';
                this.currentNote.body = '';
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
