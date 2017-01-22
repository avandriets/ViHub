import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../../Utility/elements.service';
import {ElementVi, TransportObject} from '../../Utility/base-classes';
import {Router} from '@angular/router';

@Component({
    selector: 'elements-list',
    templateUrl: '/static/app/Components/Elements/elements-list.component.html',
})
export class ElementsListComponent implements OnInit {

    error: any;
    @Input() localElements:ElementVi[] = [];
    @Output() onSetFavorite = new EventEmitter<TransportObject>();

    constructor(private elementService: ElementsService, private router: Router) {
    }

    ngOnInit(): void {
        // this.getElements();
    }

    gotoDetail(element: ElementVi): void {
        this.router.navigate(['/element', element.element]);
    }

    changeFavorite(element: ElementVi): void {
        this.elementService.setFavorite(element.element).then((ret)=> {

            let trsObj = new TransportObject();
            trsObj.type = "ChangeFavorite";
            trsObj.object = element;

            this.onSetFavorite.emit(trsObj);
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
    }
}
