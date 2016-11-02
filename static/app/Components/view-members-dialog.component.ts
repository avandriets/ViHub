import {Component, Input} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {WindowRef} from '../Utility/WindowRef';
import {BaseDialog} from "../Utility/BaseDialog";
import {ElementVi, BaseObject, UserVi} from "../Utility/base-classes";


@Component({
    selector: 'view-members-dialog',
    templateUrl: '/static/app/Components/view-members-dialog.component.html',
})

export class ViewMemberDialogComponent extends BaseDialog {

    @Input() currentElement: ElementVi;
    membersList: UserVi[] = [];

    getCurrentObject(): BaseObject {
        return this.currentElement;
    }

    getMembers(): void {
        this.elementService.getMembers(this.currentElement.element)
            .then((retUsers) => {
                this.membersList = retUsers;
            }).catch((error)=> {
            this.SetError(error);
        });
    }

    deleteUser(deletedUser: UserVi): void {
        this.elementService.deleteMember(this.currentElement.element, deletedUser)
            .then(() => {
                //delete this.membersList[deletedUser];
                var index = this.membersList.indexOf(deletedUser, 0);
                if (index > -1) {
                    this.membersList.splice(index, 1);
                }
            }).catch((error)=> {
            this.SetError(error);
        });
    }

    getEventEmitter(): any {
        return undefined;
    }

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    initDialog(): void {
        this.getMembers();
    }

    initComponent(): void {
        let dialog = document.querySelector("#ViewMemberDialogID");//.querySelector(".ms-Dialog");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    openDialog(): void {
        super.openDialog();
        this.SetError(null);
    }
}
