import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementsService } from './elements.service';


@Component({
    selector: 'add-element-dialog',
    templateUrl: '/static/app/add-element-dialog.component.html',
})

export class AddElementDialogComponent implements OnInit{

    hasError = false;
    errorMessage: string;

    add_dialog:any;
    window_fabric: any;

    name:string;
    description:string;
    element_type: any;

    modelTypes: any;

    constructor( private elementService: ElementsService) {
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

                let ss = this.elementService.getElements();
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
        this.window_fabric = window.fabric;

        let dialog =  document.querySelector(".th-body").querySelector(".ms-Dialog");
        this.add_dialog = new this.window_fabric['Dialog'](dialog);
    }
}
