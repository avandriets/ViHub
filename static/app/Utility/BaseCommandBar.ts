import { Output, EventEmitter} from '@angular/core';
import {TransportObject} from "./base-classes";

export abstract class BaseCommandBar {

    constructor() { }

    abstract getEventEmitter() : any;

    onLocalDataChange(dataChanged: TransportObject) :void{
        this.getEventEmitter().emit(dataChanged);
    }
}