import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi, UserVi} from "../Utility/base-classes";


@Component({
    selector: 'add-members-dialog',
    templateUrl: '/static/app/Components/add-member-dialog.component.html',
})

export class AddMemberDialogComponent extends BaseDialog {

    @Input() currentElement: ElementVi;
    membersList: UserVi[] = [];
    searchString: string = "";

    searchMembers(): void {
        this.elementService.searchMembers(this.searchString)
            .then((retUsers) => {
                this.membersList = retUsers;
            }).catch((error)=> {
            this.SetError(error);
        });
    }

    addUser(addUser: UserVi): void {
        this.elementService.addMember(this.currentElement.element, addUser)
            .then(() => {

                var index = this.membersList.indexOf(addUser, 0);
                if (index > -1) {
                    this.membersList.splice(index, 1);
                }
            }).catch((error)=> {
            this.SetError(error);
        });
    }

    initDialog(): void {
        this.membersList = [];
        this.searchString = "";
    }

    getEventEmitter(): any {
        return undefined;
    }

    constructor(private elementService: ElementsService, public winRef: WindowRef) {
        super(winRef);
    }

    initComponent(): void {
        let dialog = document.querySelector("#addMemberDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }


    openDialog(): void {
        super.openDialog();
        this.SetError(null);
    }
}
