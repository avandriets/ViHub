import {Component, ViewChild, Input} from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import { WindowRef } from '../Utility/WindowRef';
import {ElementsService} from '../Utility/elements.service';
import {BaseCommandBar} from "../Utility/BaseCommandBar";
import {AddElementDialogComponent} from "../Dialogs/add-element-dialog.component";
import {ElementVi} from "../Utility/element";
import {EditElementDialogComponent} from "../Dialogs/edit-element-dialog.component";

@Component({
    selector: 'detail-command-bar',
    templateUrl: '/static/app/Components/detail-command-bar.component.html',
})

export class DetailCommandBarComponent extends BaseCommandBar {

    @Input() currentElement: ElementVi;

    @Output() onDataChange = new EventEmitter();

    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent;
    @ViewChild(EditElementDialogComponent) editDialog: EditElementDialogComponent;

    getEventEmitter(): any {
        return this.onDataChange;
    }

    constructor(private elementService: ElementsService, private winRef: WindowRef) {
        super();
    }

    onClickCreateElement() :void{
        this.addDialog.openDialog();
    }

    onClickEditElement() :void{
        this.editDialog.openDialog();
    }
}
