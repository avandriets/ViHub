import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ElementsService} from './elements.service';
import { Router } from '@angular/router';

@Component({
    selector: 'elements-list',
    templateUrl: '/static/app/elements-list.component.html',
})
export class ElementsListComponent implements OnInit {

    error: any;

    constructor(private elementService: ElementsService, private router: Router,) {
    }

    ngOnInit(): void {
        this.getElements();
    }

    private getElements() {
        this.elementService.getElements().then((elements) => {
            }
        ).catch(error => this.error = error);
    }

    gotoDetail(element: Element): void {
        this.router.navigate(['/element', element.id]);
    }
}
