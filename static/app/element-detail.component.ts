/**
 * Created by AVAndriets on 08.10.16.
 */
import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location}               from '@angular/common';
import {Element} from './Utility/element'
import {ElementsService} from './Utility/elements.service'
import {WindowRef} from './Utility/WindowRef';


@Component({
    selector: 'element-detail',
    templateUrl: '/static/app/element-detail.component.html'
})

export class ElementDetailComponent implements OnInit, AfterViewInit {

    element: Element;

    elementsSet: Element[] = [];
    error: any;
    constructor(private elementService: ElementsService,
                private route: ActivatedRoute,
                private location: Location,
                private winRef: WindowRef) {
    }

    ngAfterViewInit(): void {
        var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
        for (var i = 0; i < CommandButtonElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
        }

        var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        for (var i = 0; i < CommandBarElements.length; i++) {
            new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
        }

        var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
        for (var i = 0; i < DropdownHTMLElements.length; ++i) {
            var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
        }
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.elementService.getElementById(id).then(
                (element) => {
                    this.element = element;
                    console.log(this.element);
                    console.log(id);

                    this.elementService.getElements(this.element.element)
                        .then((retElements) => {
                            this.elementsSet = retElements;
                        }).catch((error)=> {
                        this.error = error;
                    });
                }
            );
        });
    }
}