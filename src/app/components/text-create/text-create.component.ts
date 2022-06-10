import { Component, OnInit } from '@angular/core';
import { TextsListComponent } from '../texts-list/texts-list.component';

@Component({
    selector: 'app-text-create',
    templateUrl: './text-create.component.html',
    styleUrls: ['./text-create.component.scss']
})
export class TextCreateComponent extends TextsListComponent implements OnInit {

    firstName: any;
    name: any;
    a: any;

    addText(): void {
        if (localStorage.getItem('texts')) {
            this.a = localStorage.getItem('texts');
            this.a = JSON.parse(this.a);
            this.a.push({ id: this.a.length + 1, name: this.firstName });
            this.a = JSON.stringify(this.a);

            localStorage.setItem('texts', `${this.a}`);
        } else {
            localStorage.setItem('texts', JSON.stringify([{ id: 1, name: this.firstName }]));
        }

        this.start();
    }

}
