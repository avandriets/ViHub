/**
 * Created by AVAndriets on 04.10.16.
 */

import {Injectable} from '@angular/core';
import {ElementVi, Favorite} from './element';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ElementsService {
    //URLs
    private elementsUrl = '/rest/elements/';
    private favoriteUrl = '/rest/element-favorite/';

    private headers = new Headers({'Content-Type': 'application/json'});

    cardView: boolean = true;

    constructor(private http: Http) {
    }

    getElementById(id: number): Promise<ElementVi> {

        const url = `${this.elementsUrl}${id}/`;

        return this.http
            .get(url)
            .toPromise()
            .then((response) => {
                let element = response.json() as ElementVi;
                return element;
            })
            .catch(this.handleError);
    }

    getElements(parent: number): Promise<ElementVi[]> {

        let parent_param: string = "-1";
        if (parent != null) {
            parent_param = parent.toString();
        }

        let params = new URLSearchParams();
        params.set('parent', parent_param); // the user's search value

        return this.http
            .get(this.elementsUrl, {search: params})
            .toPromise()
            .then((response) => {
                return response.json() as ElementVi[];
            })
            .catch(this.handleError);
    }

    getFavorite(): Promise<Favorite[]> {

        return this.http
            .get(this.favoriteUrl)
            .toPromise()
            .then((response) => {
                return response.json() as Favorite[];
            })
            .catch(this.handleError);

    }

    createElement(name: string, description: string, element_type: string, parentElement: ElementVi): Promise<ElementVi> {
        return this.http
            .post(this.elementsUrl, JSON.stringify({name: name, description: description, element_type: element_type, parent: parentElement.element}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    setFavorite(id: number): Promise<any> {
        const url = `/set_favorite/${id}`;

        return this.http
            .post(url, null, {headers: this.headers})
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    editElement(currentElement: ElementVi) {

        const url = `${this.elementsUrl}${currentElement.element}/`;

        return this.http
            .put(url, JSON.stringify(currentElement), {headers: this.headers})
            .toPromise()
            .then(() => currentElement)
            .catch(this.handleError);
    }
}