import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, TransportObject} from "../Utility/base-classes";
import {Router} from '@angular/router';


@Component({
    selector: 'delete-element-dialog',
    templateUrl: '/static/app/Dialogs/delete-element-dialog.component.html',
})

export class DeleteElementDialogComponent extends BaseDialog {

    @Input() deletedElement: ElementVi;
    @Output() onDeleteElement = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onDeleteElement;
    }

    constructor(private elementService: ElementsService, public winRef: WindowRef, private router: Router ) {
        super(winRef);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onDeleteElementClick(): void {

        this.deletedElement.is_delete = 1;
        this.elementService.editElement(this.deletedElement)
            .then((data) => {

                let trsObj = new TransportObject();
                trsObj.type = "Element";
                trsObj.object = (data as ElementVi);

                this.onDeleteElement.emit(trsObj);

                this.errorMessage = '';
                this.hasError = false;

                this.closeDialog();

                this.router.navigate(['/']);
            })
            .catch((error) => {
                this.errorMessage = error;
                this.hasError = true;
            });
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    openDialog(): void {
        super.openDialog();
    }
}
