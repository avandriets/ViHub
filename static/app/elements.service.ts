/**
 * Created by AVAndriets on 04.10.16.
 */

import {Injectable} from '@angular/core';
import {Element} from './element';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ElementsService {
    private elementsUrl = '/rest/elements/';
    private headers = new Headers({'Content-Type': 'application/json'});

    elementsSet: Element[] = [];
    cardView: boolean = true;

    constructor(private http: Http) {
    }

    getElementById(id:number) :Promise<Element>{

        const url = `${this.elementsUrl}${id}/`;

        return this.http
            .get(url)
            .toPromise()
            .then((response) => {
                let element = response.json() as Element;
                return element;
            })
            .catch(this.handleError);
    }

    getElements(): Promise<Element[]> {

        return this.http
            .get(this.elementsUrl)
            .toPromise()
            .then((response) => {
                this.elementsSet = response.json() as Element[];
                return this.elementsSet;
            })
            .catch(this.handleError);

    }

    create(name: string, description: string, element_type:string): Promise<Element> {
        return this.http
            .post(this.elementsUrl, JSON.stringify({name: name, description: description, element_type: element_type}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}