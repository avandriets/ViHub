import {Component, Input, Output, EventEmitter} from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ElementsService } from '../Utility/elements.service';
import { WindowRef } from '../Utility/WindowRef';


@Component({
    selector: 'add-element-dialog',
    templateUrl: '/static/app/add-element-dialog.component.html',
})

export class AddElementDialogComponent implements OnInit{

    hasError = false;
    errorMessage: string;

    add_dialog:any;

    name:string;
    description:string;
    element_type: any;

    modelTypes: any;

    @Output() onAddElement = new EventEmitter();

    constructor( private elementService: ElementsService, private winRef: WindowRef) {
        this.name = '';
        this.description = '';
        this.modelTypes = [{id: 'W', name: 'Workflow'},
            {id: 'K', name: 'Wiki'},
            {id: 'H', name: 'White board'}];
    }

    openDialog(): void {
        this.add_dialog.open();
    }

    closeDialog(): void {
        this.add_dialog.close();
    }

    onCreateElement(): void
    {
        this.name = this.name.trim();
        this.description = this.description.trim();

        if(this.name == null || this.name == ' ' || this.name.length == 0){
            this.hasError = true;
            this.errorMessage = 'Заполните поле название.';
            return;
        }

        if(this.description == null || this.description == ' ' || this.description.length == 0){
            this.hasError = true;
            this.errorMessage = 'Заполните описание.';
            return;
        }


        this.elementService.create(this.name, this.description, this.element_type)
            .then((data) => {

                this.onAddElement.emit();

                this.name= '';
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

    ngOnInit(): void {
        let dialog =  document.querySelector(".th-body").querySelector(".ms-Dialog");
        this.add_dialog = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }
}
