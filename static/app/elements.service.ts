/**
 * Created by AVAndriets on 04.10.16.
 */

import {Injectable} from '@angular/core';
import {Element} from './element';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ElementsService {
    private elementsUrl = 'rest/elements';

    constructor(private http: Http) {
    }

    getElements(): Promise<Element[]> {

        return this.http
            .get(this.elementsUrl)
            .toPromise()
            .then((response) => {
                let sss = response.json() as Element[];
                console.log('Get data');
                console.log(sss);
                return sss;
            })
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}