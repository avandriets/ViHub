import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {WindowRef} from '../../Utility/WindowRef';
import {BaseDialog} from "../../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi, IsOwnerReadOnlyPermission} from "../../Utility/base-classes";


@Component({
    selector: 'delete-message-dialog',
    templateUrl: '/static/app/Components/Messages/delete-message-dialog.component.html',
})

export class DeleteMessageDialogComponent extends BaseDialog {

    @Output() onDeleteMessage = new EventEmitter<TransportObject>();
    currentNote: MessageVi;

    getEventEmitter(): any {
        return this.onDeleteMessage;
    }

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
        this.currentNote = new MessageVi();
    }

    getCurrentObject(): BaseObject {
        return this.currentNote;
    }

    initDialog(note: MessageVi): void {
        this.currentNote = Object.assign({}, note);
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteMessageDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    onDeleteMessageDialog(): void {
        this.inProcess = true;

        this.elementService.deleteMessage(this.currentNote)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onDeleteMessage.emit(trsObj);

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
