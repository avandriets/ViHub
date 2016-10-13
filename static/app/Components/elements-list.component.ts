import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {ElementVi} from '../Utility/element';
import {Router} from '@angular/router';

@Component({
    selector: 'elements-list',
    templateUrl: '/static/app/Components/elements-list.component.html',
})
export class ElementsListComponent implements OnInit {

    error: any;
    @Input() localElements:ElementVi[] = [];
    @Output() onSetFavorite = new EventEmitter();

    constructor(private elementService: ElementsService, private router: Router,) {
    }

    ngOnInit(): void {
        // this.getElements();
    }

    gotoDetail(element: ElementVi): void {
        this.router.navigate(['/element', element.element]);
    }

    changeFavorite(element: ElementVi): void {
        this.elementService.setFavorite(element.element).then((ret)=> {
            this.onSetFavorite.emit();
            // this.elementService.getElements(this.parentCode);
            // this.elementService.getFavorite();
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
    }
}
