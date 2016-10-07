import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {AppComponent}  from './app.component';
import {ElementsListComponent}  from './elements-list.component';
import {CommandBarComponent}  from './command-bar.compotent';
import {ElementsService} from './elements.service';
import {AddElementDialogComponent} from './add-element-dialog.component';


@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule],
    declarations: [AppComponent, ElementsListComponent, CommandBarComponent, AddElementDialogComponent],
    providers: [
        ElementsService,
        {
            provide: XSRFStrategy,
            useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
