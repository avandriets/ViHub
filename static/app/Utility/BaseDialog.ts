import {EventEmitter, OnInit} from '@angular/core';
import {WindowRef} from '../Utility/WindowRef';
import {ElementsService} from "./elements.service";
import {NoteVi, BaseObject, BasePermissions, IsOwnerReadOnlyPermission} from "./base-classes";

export abstract class BaseDialog implements OnInit {

    constructor(public winRef: WindowRef, public elementService: ElementsService) {
        this.permission_object = new IsOwnerReadOnlyPermission();
    }

    abstract getEventEmitter(): any;

    hasError: boolean = false;
    errorMessage: string = '';

    inProcess: boolean = false;
    spinnerText: string = "Обработка запроса ...";

    permission_denied: boolean = false;
    public permission_object: BasePermissions;

    dialogInstance: any;

    openDialog(): void {
        if (this.dialogInstance != null) {
            let i = 0;
            let dialogOpen: boolean = false;

            for (i; i < this.dialogInstance._dialog.classList.length; i++) {
                if (this.dialogInstance._dialog.classList[i] == "is-open") {
                    dialogOpen = true;
                }
            }

            if (dialogOpen == false) {
                this.SetError(null);
                this.inProcess = false;
                this.permission_denied = false;
                this.dialogInstance.open();
            }
        }
        this.check_permission();
    }

    check_permission(): void {
        try {
            let local_object = this.getCurrentObject();
            if (!this.permission_object.has_object_permission(local_object, this.elementService.currentUser)) {
                throw new Error("Нет прав на операцию с объектом");
            }

        } catch (exp) {
            this.permission_denied = true;
            this.hasError = true;
            this.errorMessage = "У вас нет прав на редактирование этого объекта.";
        }
    }

    closeDialog(): void {
        this.dialogInstance.close();
    }

    onLocalDataChange(): void {
        this.getEventEmitter().emit();
    }

    ngOnInit(): void {
        this.initComponent();
    }

    abstract initComponent(): void;

    SetError(error: any): void {
        if (error != null) {
            this.hasError = true;
            if (error.json().detail) {
                this.errorMessage = error.json().detail;
            }else{
                this.errorMessage = "Ошибка";
            }

        } else {
            this.hasError = false;
        }
    }

    public abstract getCurrentObject(): BaseObject;
}