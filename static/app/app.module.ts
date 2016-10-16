import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {ElementsService} from './Utility/elements.service';
import {WindowRef} from './Utility/WindowRef';
import {AppComponent}  from './app.component';
import {ElementsListComponent}  from './Components/elements-list.component';
import {ElementsListVarComponent}  from './Components/elements-list-var.component';
import {CommandBarComponent}  from './Components/command-bar.compotent';
import {DetailCommandBarComponent}  from './Components/detail-command-bar.compotent';
import {DashboardComponent} from './dashboard.component'
import {AddElementDialogComponent} from './Dialogs/add-element-dialog.component';
import { routing, routedComponents } from './app.routing';
import {EditElementDialogComponent} from "./Dialogs/edit-element-dialog.component";
import {DeleteElementDialogComponent} from "./Dialogs/delete-element-dialog.component";
import {AddMessageDialogComponent} from "./Dialogs/add-message-dialog.component";
import {AddNoteDialogComponent} from "./Dialogs/add-note-dialog.component";
import {MessagesListComponent} from "./Components/messages-list.component";
import {NotesListComponent} from "./Components/notes-list.component";
import {BreadCrumbsComponent} from "./Components/breadcrumbs.component";
import {ViewMessageDialogComponent} from "./Dialogs/view-message-dialog.component";

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        ElementsListComponent,
        ElementsListVarComponent,
        CommandBarComponent,
        DetailCommandBarComponent,
        DashboardComponent,
        AddElementDialogComponent,
        EditElementDialogComponent,
        DeleteElementDialogComponent,
        AddMessageDialogComponent,
        MessagesListComponent,
        NotesListComponent,
        AddNoteDialogComponent,
        BreadCrumbsComponent,
        ViewMessageDialogComponent,
        routedComponents
    ],
    providers: [
        ElementsService, WindowRef,
        {
            provide: XSRFStrategy,
            useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
