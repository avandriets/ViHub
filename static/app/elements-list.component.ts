import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ElementsService} from './elements.service';

@Component({
    selector: 'elements-list',
    templateUrl: '/static/app/elements-list.component.html',
})
export class ElementsListComponent implements OnInit {

    error: any;

    constructor(private elementService: ElementsService) {
    }

    ngOnInit(): void {
        this.getElements();
    }

    private getElements() {
        this.elementService.getElements().then((elements) => {
            }
        )
            .catch(error => this.error = error);
    }
}
