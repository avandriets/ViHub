import {Component, Input, Output, EventEmitter} from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ElementsService } from '../Utility/elements.service';
import { WindowRef } from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi} from "../Utility/base-classes";


@Component({
    selector: 'add-note-dialog',
    templateUrl: '/static/app/Dialogs/add-note-dialog.component.html',
})

export class AddNoteDialogComponent extends BaseDialog implements AfterViewInit{

    @Input() parentElement: ElementVi;
    @Input() parentMessage: MessageVi;
    @Output() onAddNote = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onAddNote;
    }

    subject:string = '';
    message:string = '';
    private_note:boolean = false;

    constructor( private elementService: ElementsService, public winRef: WindowRef) {
        super(winRef);
    }

    onCreateMessage(): void
    {
        this.subject = this.subject.trim();
        this.message = this.message.trim();

        if(this.subject == null || this.subject == ' ' || this.subject.length == 0){
            this.hasError = true;
            this.errorMessage = 'Заполните заголовок.';
            return;
        }

        if(this.message == null || this.message == ' ' || this.message.length == 0){
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        let note = new NoteVi();
        note.subject = this.subject;
        note.body = this.message;
        note.element = this.parentElement.element;
        note.private_note = this.private_note;

        if(this.parentMessage != null){
        note.message = this.parentMessage.id;
        }

        this.elementService.createNote(note)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onAddNote.emit(trsObj);

                this.subject= '';
                this.message = '';
                this.errorMessage = '';
                this.hasError = false;

                this.closeDialog();
            })
            .catch((error) => {
                this.errorMessage = error;
                this.hasError = true;
            });
    }

    initComponent(): void {
        let dialog =  document.querySelector("#addNoteDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    ngAfterViewInit(): void {
        var ToggleElements = document.querySelectorAll(".ms-Toggle");
        for(var i = 0; i < ToggleElements.length; i++) {
                new this.winRef.nativeWindow.fabric['Toggle'](ToggleElements[i]);
        }
    }
}
