import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {ElementsService} from './Utility/elements.service';
import {WindowRef} from './Utility/WindowRef';
import {AppComponent}  from './app.component';
import {ElementsListComponent}  from './Components/elements-list.component';
import {CommandBarComponent}  from './Components/command-bar.compotent';
import {DetailCommandBarComponent}  from './Components/detail-command-bar.compotent';
import {DashboardComponent} from './dashboard.component'
import {AddElementDialogComponent} from './Dialogs/add-element-dialog.component';
import { routing, routedComponents } from './app.routing';
import {EditElementDialogComponent} from "./Dialogs/edit-element-dialog.component";

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        ElementsListComponent,
        CommandBarComponent,
        DetailCommandBarComponent,
        DashboardComponent,
        AddElementDialogComponent,
        EditElementDialogComponent,
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
