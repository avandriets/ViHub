/**
 * Created by AVAndriets on 04.10.16.
 */
import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {OnInit} from '@angular/core';
import {AddElementDialogComponent} from '../Dialogs/add-element-dialog.component'
import { WindowRef } from '../Utility/WindowRef';
import {ElementsService} from '../Utility/elements.service';

@Component({
    selector: 'command-bar',
    templateUrl: '/static/app/command-bar.component.html',
})

export class CommandBarComponent implements OnInit {

    @ViewChild(AddElementDialogComponent) addDialog: AddElementDialogComponent;

    @Output() onDataChange = new EventEmitter();

    constructor(private elementService: ElementsService, private winRef: WindowRef) {}

    onClickShowDialog(): void {
        this.addDialog.openDialog();
    }

    onCardViewClick() :void{
        this.elementService.cardView = true;
    }

    onTableViewClick() :void{
        this.elementService.cardView = false;
    }

    onLocalDataChange() :void{
        this.onDataChange.emit();
    }

    ngOnInit(): void {
    }
}
