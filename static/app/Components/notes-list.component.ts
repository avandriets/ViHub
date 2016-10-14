import {Component} from '@angular/core';
import {OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementsService} from '../Utility/elements.service';
import {ElementVi, TransportObject, MessageVi, NoteVi} from '../Utility/base-classes';
import {Router} from '@angular/router';

@Component({
    selector: 'notes-list',
    templateUrl: '/static/app/Components/notes-list.component.html',
})
export class NotesListComponent {

    error: any;
    @Input() localNotes:NoteVi[] = [];

    constructor(private elementService: ElementsService, private router: Router) {
    }
}
