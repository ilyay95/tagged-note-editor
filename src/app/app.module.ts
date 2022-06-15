import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TextCreateComponent } from './components/text-create/text-create.component';
import { TextsListComponent } from './components/texts-list/texts-list.component';
import { TextItemComponent } from './components/text-item/text-item.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { TagItemComponent } from './components/tag-item/tag-item.component';

@NgModule({
    declarations: [
        AppComponent,
        TextCreateComponent,
        TextsListComponent,
        TextItemComponent,
        TagsListComponent,
        TagItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
