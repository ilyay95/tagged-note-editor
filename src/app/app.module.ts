import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TextCreateComponent } from './components/text-create/text-create.component';
import { TextsListComponent } from './components/texts-list/texts-list.component';
import { TextItemComponent } from './components/text-item/text-item.component';

@NgModule({
    declarations: [
        AppComponent,
        TextCreateComponent,
        TextsListComponent,
        TextItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
