import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {WindowRef} from '../../Utility/WindowRef';
import {BaseDialog} from "../../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi} from "../../Utility/base-classes";
import {tryCatch} from "rxjs/util/tryCatch";
import {BasePanel} from "../../Utility/BasePanel";


@Component({
    selector: 'edit-message-panel',
    templateUrl: '/static/app/Components/Messages/edit-message-panel.component.html',
})

export class EditMessagePanelComponent extends BasePanel {

    @Output() onSaveNote = new EventEmitter<TransportObject>();
    currentMessage: MessageVi;
    editMode: boolean;

    getEventEmitter(): any {
        return this.onSaveNote;
    }

    constructor(public winRef: WindowRef, public elementService: ElementsService) {
        super(winRef, elementService);
        this.currentMessage = new MessageVi();
    }

    getCurrentObject(): BaseObject {
        return this.currentMessage;
    }

    initDialog(note: MessageVi, edit: boolean): void {
        this.currentMessage = Object.assign({}, note);
        this.editMode = edit;
    }

    initComponent(): void {
        this.panelTemplate = document.querySelector("#editMessagePanelID");
    }

    onSaveNoteDialog(): void {

        this.currentMessage.subject = this.currentMessage.subject.trim();
        this.currentMessage.body = this.currentMessage.body.trim();

        // if (this.currentMessage.subject == null || this.currentMessage.subject == ' ' || this.currentMessage.subject.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните заголовок.';
        //     return;
        // }

        if (this.currentMessage.body == null || this.currentMessage.body == ' ' || this.currentMessage.body.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        this.inProcess = true;

        this.elementService.editMessage(this.currentMessage)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onSaveNote.emit(trsObj);

                this.currentMessage.subject = '';
                this.currentMessage.body = '';
                this.errorMessage = '';
                this.hasError = false;
                this.inProcess = false;

                //Close panel
                this.panelInstance.dismiss();
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
