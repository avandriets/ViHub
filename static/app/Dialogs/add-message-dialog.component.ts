import {Component, Input, Output, EventEmitter} from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ElementsService } from '../Utility/elements.service';
import { WindowRef } from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject} from "../Utility/base-classes";


@Component({
    selector: 'add-message-dialog',
    templateUrl: '/static/app/Dialogs/add-message-dialog.component.html',
})

export class AddMessageDialogComponent extends BaseDialog{

    @Input() parentElement: ElementVi;
    @Output() onAddMessage = new EventEmitter<TransportObject>();

    check_permission(): void {
        //return true;
    }

    getCurrentObject(): BaseObject {
        return undefined;
    }

    getEventEmitter(): any {
        return this.onAddMessage;
    }

    subject:string = '';
    message:string = '';

    constructor( public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    onCreateMessage(): void
    {
        this.subject = this.subject.trim();
        this.message = this.message.trim();

        // if(this.subject == null || this.subject == ' ' || this.subject.length == 0){
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните поле тема.';
        //     return;
        // }

        if(this.message == null || this.message == ' ' || this.message.length == 0){
            this.hasError = true;
            this.errorMessage = 'Заполните тело сообщения.';
            return;
        }

        let message = new MessageVi();
        message.subject = this.subject;
        message.body = this.message;
        message.element = this.parentElement.element;

        this.inProcess = true;

        this.elementService.createMessage(message)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Message";
                trsObj.object = (data as MessageVi);

                this.onAddMessage.emit(trsObj);

                this.subject= '';
                this.message = '';
                this.errorMessage = '';
                this.hasError = false;

                this.inProcess = false;

                this.closeDialog();
            })
            .catch((error) => {
                this.errorMessage = error;
                this.hasError = true;

                this.inProcess = false;
            });
    }

    initComponent(): void {
        let dialog =  document.querySelector("#addMessageDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }
}
