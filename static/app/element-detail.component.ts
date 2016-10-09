/**
 * Created by AVAndriets on 08.10.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location}               from '@angular/common';
import {Element} from './element'
import {ElementsService} from './elements.service'


@Component({
    selector: 'element-detail',
    template: `<h1>Hello details!</h1>
    <div *ngIf="element">
      <h2>{{element.name}} details!</h2>
      <div>
        <label>id: </label>{{element.id}}
      </div>
    </div>
  `
})

export class ElementDetailComponent implements OnInit {

    element: Element;

    constructor(private elementService: ElementsService,
                private route: ActivatedRoute,
                private location: Location) {
        console.log(' !!! ');
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.elementService.getElementById(id).then(
                (element) => {
                    this.element = element
                }
            );
        });
    }
}