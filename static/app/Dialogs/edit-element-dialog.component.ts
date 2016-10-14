import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, TransportObject} from "../Utility/base-classes";


@Component({
    selector: 'edit-element-dialog',
    templateUrl: '/static/app/Dialogs/edit-element-dialog.component.html',
})

export class EditElementDialogComponent extends BaseDialog {

    @Input() editedElement: ElementVi;
    @Output() onEditElement = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onEditElement;
    }

    name: string;
    description: string;

    constructor(private elementService: ElementsService, public winRef: WindowRef) {
        super(winRef);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if(this.editedElement != null) {
            this.name = this.editedElement.name;
            this.description = this.editedElement.description;
        }
    }

    onSaveElement(): void {
        this.name = this.name.trim();
        this.description = this.description.trim();

        if (this.name == null || this.name == ' ' || this.name.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните поле название.';
            return;
        }

        if (this.description == null || this.description == ' ' || this.description.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните описание.';
            return;
        }

        this.editedElement.name = this.name;
        this.editedElement.description = this.description;

        this.elementService.editElement(this.editedElement)
            .then((data) => {

                let trsObj = new TransportObject();
                trsObj.type = "Element";
                trsObj.object = (data as ElementVi);

                this.onEditElement.emit(trsObj);

                this.name = '';
                this.description = '';
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
        let dialog = document.querySelector("#editDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }


    openDialog(): void {
        if(this.editedElement != null) {
            this.name = this.editedElement.name;
            this.description = this.editedElement.description;
        }
        super.openDialog();
    }
}
