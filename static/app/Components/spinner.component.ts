import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnInit, AfterViewInit} from '@angular/core';
import {WindowRef} from '../Utility/WindowRef';


@Component({
    selector: 'spinner-component',
    templateUrl: '/static/app/Components/spinner.component.html',
})

export class SpinnerComponent implements OnInit {

    constructor(private winRef: WindowRef) {
    }

    ngOnInit(): void {
        let elements = document.querySelectorAll('.ms-Spinner');
        let i = elements.length;
        let component: any;

        while (i--) {
            component = new this.winRef.nativeWindow.fabric['Spinner'](elements[i]);
        }

    }
}
