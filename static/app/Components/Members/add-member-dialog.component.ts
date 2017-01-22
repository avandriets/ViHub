import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {WindowRef} from '../../Utility/WindowRef';
import {BaseDialog} from "../../Utility/BaseDialog";
import {ElementVi, MessageVi, BaseObject, TransportObject, NoteVi, UserVi} from "../../Utility/base-classes";


@Component({
    selector: 'add-members-dialog',
    templateUrl: '/static/app/Components/Members/add-member-dialog.component.html',
})

export class AddMemberDialogComponent extends BaseDialog {

    @Input() currentElement: ElementVi;
    membersList: UserVi[] = [];
    searchString: string = "";

    getCurrentObject(): BaseObject {
        return this.currentElement;
    }

    searchMembers(): void {

        if(!this.permission_denied && this.searchString.trim() != "") {
            this.inProcess = true;

            this.elementService.searchMembers(this.searchString)
                .then((retUsers) => {
                    this.membersList = retUsers;
                    this.inProcess = false;
                }).catch((error)=> {
                this.SetError(error);
                this.inProcess = false;
            });
        }
    }

    addUser(addUser: UserVi): void {
        this.inProcess = true;
        this.elementService.addMember(this.currentElement.element, addUser)
            .then(() => {
                this.inProcess = false;

                var index = this.membersList.indexOf(addUser, 0);
                if (index > -1) {
                    this.membersList.splice(index, 1);
                }
            }).catch((error)=> {
            this.inProcess = false;
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

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    initComponent(): void {
        let dialog = document.querySelector("#addMemberDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }
}
