import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {ElementsService} from './elements.service';
import {WindowRef} from './WindowRef';
import {AppComponent}  from './app.component';
import {ElementsListComponent}  from './elements-list.component';
import {CommandBarComponent}  from './command-bar.compotent';
import {AddElementDialogComponent} from './add-element-dialog.component';
import { routing, routedComponents } from './app.routing';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        ElementsListComponent,
        CommandBarComponent,
        AddElementDialogComponent,
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
