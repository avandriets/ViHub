import { Output, EventEmitter} from '@angular/core';

export abstract class BaseCommandBar {

    constructor() { }

    abstract getEventEmitter() : any;

    onLocalDataChange() :void{
        this.getEventEmitter().emit();
    }
}