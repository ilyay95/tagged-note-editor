import { Component, OnInit } from '@angular/core';
import { TextItemComponent } from '../text-item/text-item.component';

@Component({
    selector: 'app-texts-list',
    templateUrl: './texts-list.component.html',
    styleUrls: ['./texts-list.component.scss']
})
export class TextsListComponent extends TextItemComponent implements OnInit {
    
    texts: any

    ngOnInit(): void {
        this.start();
    }

    ngDoCheck(): void {
        this.start();
    }

    start(): void {
        this.texts = localStorage.getItem('texts');
        this.texts = JSON.parse(this.texts);
    }

    selectElement(id: any): void {
        console.log(id)
    }
}
