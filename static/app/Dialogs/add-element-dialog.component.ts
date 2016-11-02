import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, TransportObject, BaseObject} from "../Utility/base-classes";


@Component({
    selector: 'add-element-dialog',
    templateUrl: '/static/app/Dialogs/add-element-dialog.component.html',
})

export class AddElementDialogComponent extends BaseDialog {

    @Input() parentElement: ElementVi;
    @Output() onAddElement = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onAddElement;
    }

    check_permission(): void {
        //super.check_permission();
    }

    getCurrentObject(): BaseObject {
        return undefined;
    }

    name: string = '';
    description: string = '';
    element_type: any;
    modelTypes: Object[] = [{id: 'W', name: 'Workflow'},
        {id: 'K', name: 'Wiki'},
        {id: 'H', name: 'White board'}];


    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
        this.spinnerText = "Сохраенение элемента ...";
    }


    onCreateElement(): void {
        this.name = this.name.trim();
        this.description = this.description.trim();

        if (this.name == null || this.name == ' ' || this.name.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните поле название.';
            return;
        }

        // if (this.description == null || this.description == ' ' || this.description.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните описание.';
        //     return;
        // }

        if(this.element_type == null){
            this.hasError = true;
            this.errorMessage = 'Укажите тип элемента.';
            return;
        }

        this.inProcess = true;

        this.elementService.createElement(this.name, this.description, this.element_type, this.parentElement)
            .then((data) => {

                let trsObj = new TransportObject();
                trsObj.type = "Element";
                trsObj.object = (data as ElementVi);

                this.onAddElement.emit(trsObj);

                this.name = '';
                this.description = '';
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
        let dialog = document.querySelector("#addDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

}
