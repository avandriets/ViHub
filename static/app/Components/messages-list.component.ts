import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {ElementVi, TransportObject, MessageVi} from '../Utility/base-classes';
import {Router} from '@angular/router';

@Component({
    selector: 'messages-list',
    templateUrl: '/static/app/Components/messages-list.component.html',
})
export class MessagesListComponent {

    error: any;
    @Input() localMessages:MessageVi[] = [];

    constructor(private elementService: ElementsService, private router: Router) {
    }
}
