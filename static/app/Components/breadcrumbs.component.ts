import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {ElementVi, TransportObject, MessageVi, NoteVi} from '../Utility/base-classes';
import {Router} from '@angular/router';

@Component({
    selector: 'breadcrumbs',
    templateUrl: '/static/app/Components/breadcrumbs.component.html',
})
export class BreadCrumbsComponent {

    error: any;
    @Input() parentElementsList:ElementVi[] = [];

    constructor(private elementService: ElementsService, private router: Router) {
    }

    gotoElement(element: ElementVi): void {
        if(element != null)
            this.router.navigate(['/element', element.element]);
        else
            this.router.navigate(['/']);
    }
}
