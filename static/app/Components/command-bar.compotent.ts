import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {AddElementDialogComponent} from '../Dialogs/add-element-dialog.component'
import { WindowRef } from '../Utility/WindowRef';
import {ElementsService} from '../Utility/elements.service';
import {BaseCommandBar} from '../Utility/BaseCommandBar';
import {TransportObject} from "../Utility/base-classes";

@Component({
    selector: 'command-bar',
    templateUrl: '/static/app/Components/command-bar.component.html',
})

export class CommandBarComponent extends BaseCommandBar {

    getEventEmitter(): any {
        return this.onDataChange;
    }

    @Output() onDataChange = new EventEmitter<TransportObject>();
    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent;

    constructor(private elementService: ElementsService, private winRef: WindowRef) {
        super();
    }

    onClickShowDialog(): void {
        this.addDialog.openDialog();
    }

    onCardViewClick() :void{
        this.elementService.cardView = true;
    }

    onTableViewClick() :void{
        this.elementService.cardView = false;
    }
}
