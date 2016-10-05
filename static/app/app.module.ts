import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ElementsListComponent }  from './elements-list.component';
import { CommandBarComponent }  from './command-bar.compotent';
import { ElementsService } from './elements.service';



@NgModule({
  imports: [
      BrowserModule,
    HttpModule],
  declarations: [ AppComponent, ElementsListComponent, CommandBarComponent ],
  providers: [
    ElementsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
