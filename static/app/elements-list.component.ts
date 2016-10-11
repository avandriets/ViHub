import {Component} from '@angular/core';
import {OnInit, Input} from '@angular/core';
import {ElementsService} from './elements.service';
import {Element} from './element';
import {Router} from '@angular/router';

@Component({
    selector: 'elements-list',
    templateUrl: '/static/app/elements-list.component.html',
})
export class ElementsListComponent implements OnInit {
    error: any;
    @Input() parentCode:number;

    constructor(private elementService: ElementsService, private router: Router,) {
    }

    ngOnInit(): void {
        this.getElements();
    }

    private getElements() {
        console.log("Parent code:");
        console.log(this.parentCode);
        this.elementService.getElements(this.parentCode).then((elements) => {
            }
        ).catch(error => this.error = error);
    }

    gotoDetail(element: Element): void {
        this.router.navigate(['/element', element.id]);
    }

    changeFavorite(element: Element): void {
        this.elementService.setFavorite(element.id).then((ret)=> {
            this.elementService.getElements(this.parentCode);
            this.elementService.getFavorite();
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
    }
}
