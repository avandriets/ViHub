import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ElementsService} from './elements.service';
import {Router} from '@angular/router';
import {Favorite} from './element'

@Component({
    selector: 'favorite-list',
    templateUrl: '/static/app/favorite-list.component.html',
})
export class FavoriteListComponent implements OnInit {
    error: any;

    constructor(private elementService: ElementsService, private router: Router,) {
    }

    ngOnInit(): void {
        this.getElements();
    }

    private getElements() {
        this.elementService.getFavorite().then((elements) => {
            }
        ).catch(error => this.error = error);
    }

    gotoDetail(element: Favorite): void {
        this.router.navigate(['/element', element.element]);
    }

    changeFavorite(element: Favorite): void {
        console.log('Click setFavorite');
        this.elementService.setFavorite(element.element).then((ret)=> {
            this.elementService.getElements();
            this.elementService.getFavorite();
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
    }
}
