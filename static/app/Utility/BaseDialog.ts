import {EventEmitter, OnInit} from '@angular/core';
import { WindowRef } from '../Utility/WindowRef';

export abstract class BaseDialog implements OnInit {

    constructor(public winRef: WindowRef) { }

    abstract getEventEmitter() : any;

    hasError:boolean = false;
    errorMessage: string = '';

    dialogInstance:any;

    openDialog(): void {
        this.dialogInstance.open();
    }

    closeDialog(): void {
        this.dialogInstance.close();
    }

    onLocalDataChange() :void{
        this.getEventEmitter().emit();
    }

    ngOnInit(): void {
        this.initComponent();
    }

    abstract initComponent() :void;

    SetError(error:any) :void{
        if(error != null) {
            this.hasError = true;
            this.errorMessage = error.json().detail;
        }else{
            this.hasError = false;
        }
    }
}