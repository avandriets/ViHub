import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject} from "../Utility/base-classes";


@Component({
    selector: 'view-message-dialog',
    templateUrl: '/static/app/Dialogs/view-message-dialog.component.html',
})

export class ViewMessageDialogComponent extends BaseDialog {

    @Output() onAddMessage = new EventEmitter<TransportObject>();
    currentMessage: MessageVi;

    getEventEmitter(): any {
        return this.onAddMessage;
    }

    message_type: string = '';
    subject: string = '';
    message: string = '';

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    initDialog(message: MessageVi): void {
        this.currentMessage = message;
        this.subject = this.currentMessage.subject;
        this.message = this.currentMessage.body;
        this.message_type = this.currentMessage.message_type;
    }

    initComponent(): void {
        let dialog = document.querySelector("#viewMessageDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    getCurrentObject(): BaseObject {
        return this.currentMessage;
    }


    check_permission(): void {
        //super.check_permission();
    }
}
