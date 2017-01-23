import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {ElementsService} from './Utility/elements.service';
import {WindowRef} from './Utility/WindowRef';
import {AppComponent}  from './app.component';
import {ElementsListComponent}  from './Components/Elements/elements-list.component';
import {ElementsListVarComponent}  from './Components/Elements/elements-list-var.component';
import {CommandBarComponent}  from './Components/CommandBars/command-bar.compotent';
import {DetailCommandBarComponent}  from './Components/CommandBars/detail-command-bar.compotent';
import {DashboardComponent} from './dashboard.component'
import {AddElementDialogComponent} from './Dialogs/add-element-dialog.component';
import { routing, routedComponents } from './app.routing';
import {EditElementDialogComponent} from "./Dialogs/edit-element-dialog.component";
import {DeleteElementDialogComponent} from "./Components/Elements/delete-element-dialog.component";
import {AddMessageDialogComponent} from "./Dialogs/add-message-dialog.component";
import {AddNoteDialogComponent} from "./Dialogs/add-note-dialog.component";
import {MessagesListComponent} from "./Components/Messages/messages-list.component";
import {NotesListComponent} from "./Components/Notes/notes-list.component";
import {BreadCrumbsComponent} from "./Components/breadcrumbs.component";
import {ViewMessageDialogComponent} from "./Dialogs/view-message-dialog.component";
import {EditNoteDialogComponent} from "./Components/Notes/edit-note-dialog.component";
import {DeleteNoteDialogComponent} from "./Components/Notes/delete-note-dialog.component";
import {ViewMemberDialogComponent} from "./Components/Members/view-members-dialog.component";
import {AddMemberDialogComponent} from "./Components/Members/add-member-dialog.component";
import {SpinnerComponent} from "./Components/spinner.component";
import {AddElementPanelComponent} from "./Components/Elements/add-element-panel.component";
import {EditElementPanelComponent} from "./Components/Elements/edit-element-panel.component";
import {AddMessagePanelComponent} from "./Components/Messages/add-message-panel.component";
import {AddNotePanelComponent} from "./Components/Notes/add-note-panel.component";
import {EditMessagePanelComponent} from "./Components/Messages/edit-message-panel.component";
import {DeleteMessageDialogComponent} from "./Components/Messages/delete-message-dialog.component";

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
        EditNoteDialogComponent,
        DeleteNoteDialogComponent,
        BreadCrumbsComponent,
        ViewMessageDialogComponent,
        ViewMemberDialogComponent,
        AddMemberDialogComponent,
        SpinnerComponent,
        routedComponents,
        AddElementPanelComponent,
        EditElementPanelComponent,
        AddMessagePanelComponent,
        AddNotePanelComponent,
        EditMessagePanelComponent,
        DeleteMessageDialogComponent
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
