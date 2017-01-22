import {EventEmitter, OnInit} from '@angular/core';
import {WindowRef} from './WindowRef';
import {ElementsService} from "./elements.service";
import {NoteVi, BaseObject, BasePermissions, IsOwnerReadOnlyPermission} from "./base-classes";


export abstract class BasePanel implements OnInit {

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

    panelTemplate: any;
    panelInstance: any;

    openPanel(): void {
        this.buildPanel();
        this.check_permission();
    }

    buildPanel(): void {
        this.panelInstance = new this.winRef.nativeWindow.fabric['Panel'](this.panelTemplate);
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