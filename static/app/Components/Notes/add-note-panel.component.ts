import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {WindowRef} from '../../Utility/WindowRef';
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi} from "../../Utility/base-classes";
import {BasePanel} from "../../Utility/BasePanel";


@Component({
    selector: 'add-note-panel',
    templateUrl: '/static/app/Components/Notes/add-note-panel.component.html',
})

export class AddNotePanelComponent extends BasePanel implements AfterViewInit {

    getCurrentObject(): BaseObject {
        return undefined;
    }

    check_permission(): void {
        //super.check_permission();
    }

    @Input() parentElement: ElementVi;
    @Input() parentMessage: MessageVi;
    @Output() onAddNote = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onAddNote;
    }

    subject: string = '';
    message: string = '';
    private_note: boolean = false;

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    onCreateNote(): void {
        this.subject = this.subject.trim();
        this.message = this.message.trim();

        // if (this.subject == null || this.subject == ' ' || this.subject.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните заголовок.';
        //     return;
        // }

        if (this.message == null || this.message == ' ' || this.message.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        let note = new NoteVi();
        note.subject = this.subject;
        note.body = this.message;
        note.element = this.parentElement.element;
        note.private_note = this.private_note;

        if (this.parentMessage != null) {
            note.message = this.parentMessage.id;
        }

        this.inProcess = true;

        this.elementService.createNote(note)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onAddNote.emit(trsObj);

                this.subject = '';
                this.message = '';
                this.parentMessage = null;

                this.errorMessage = '';
                this.hasError = false;

                this.inProcess = false;

                //Close panel
                this.panelInstance.dismiss();
            })
            .catch((error) => {
                this.SetError(error);
                // this.errorMessage = error;
                // this.hasError = true;

                this.inProcess = false;
            });
    }

    initDialog(pParentMessage: MessageVi): void {
        this.parentMessage = pParentMessage;
    }

    initComponent(): void {
        this.panelTemplate = document.querySelector("#addNotePanelID");
    }

    ngAfterViewInit(): void {
        var ToggleElements = document.querySelectorAll(".ms-Toggle");
        for (var i = 0; i < ToggleElements.length; i++) {
            new this.winRef.nativeWindow.fabric['Toggle'](ToggleElements[i]);
        }
    }
}
