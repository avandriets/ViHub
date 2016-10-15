/**
 * Created by AVAndriets on 04.10.16.
 */

import {Injectable} from '@angular/core';
import {ElementVi, Favorite, MessageVi, NoteVi} from './base-classes';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ElementsService {
    //URLs
    private elementsUrl = '/rest/elements/';
    private favoriteUrl = '/rest/element-favorite/';
    private messageUrl = '/rest/messages/';
    private noteUrl = '/rest/notes/';

    private headers = new Headers({'Content-Type': 'application/json'});

    cardView: boolean = true;

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getElementById(id: number): Promise<ElementVi> {

        const url = `${this.elementsUrl}${id}/`;

        return this.http
            .get(url)
            .toPromise()
            .then((response) => {

                return (response.json() as ElementVi);
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

    setFavorite(id: number): Promise<any> {
        const url = `${this.elementsUrl}${id}/set-favorite/`;

        return this.http
            .post(url, null, {headers: this.headers})
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    editElement(currentElement: ElementVi): Promise<ElementVi> {

        const url = `${this.elementsUrl}${currentElement.element}/`;

        return this.http
            .put(url, JSON.stringify(currentElement), {headers: this.headers})
            .toPromise()
            .then(() => currentElement)
            .catch(this.handleError);
    }

    createMessage(newMessage: MessageVi): Promise<MessageVi> {
        return this.http
            .post(this.messageUrl, JSON.stringify(newMessage), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    createNote(newNote: NoteVi): Promise<NoteVi> {
        return this.http
            .post(this.noteUrl, JSON.stringify(newNote), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    editNote(editedNote: NoteVi): Promise<NoteVi> {

        const url = `${this.noteUrl}${editedNote.id}/`;

        return this.http
            .put(url, JSON.stringify(editedNote), {headers: this.headers})
            .toPromise()
            .then((res) => res.json() as NoteVi)
            .catch(this.handleError);
    }

    deleteNote(deleteNote: NoteVi): Promise<NoteVi> {

        const url = `${this.noteUrl}${deleteNote.id}/`;

        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => deleteNote)
            .catch(this.handleError);
    }

    getMessages(element: number): Promise<MessageVi[]> {

        // let element_owner: string = "-1";
        // if (element != null) {
        //     element_owner = element.toString();
        // }
        //
        // let params = new URLSearchParams();
        // params.set('element', element_owner); // the user's search value
        const url = `${this.elementsUrl}${element}/get-messages/`;

        return this.http
            .get(url, {headers: this.headers})
            .toPromise()
            .then((response) => {
                return response.json() as MessageVi[];
            })
            .catch(this.handleError);
    }

    getNotes(element: number): Promise<NoteVi[]> {

        // let element_owner: string = "-1";
        // if (element != null) {
        //     element_owner = element.toString();
        // }
        //
        // let params = new URLSearchParams();
        // params.set('element', element_owner); // the user's search value
        const url = `${this.elementsUrl}${element}/get-notes/`;

        return this.http
            .get(url, {headers: this.headers})
            .toPromise()
            .then((response) => {
                return response.json() as NoteVi[];
            })
            .catch(this.handleError);
    }

    getBreadcrumbs(element: number): Promise<ElementVi[]> {
        const url = `${this.elementsUrl}${element}/get-breadcrumbs`;

        return this.http
            .get(url, {headers: this.headers})
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
}