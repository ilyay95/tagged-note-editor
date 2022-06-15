import { Component, OnInit, } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

export interface TagsListComponent {
    id: number;
    title: string;
    disabled?: boolean;
}
@Component({
    selector: 'app-tags-list',
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

    texts: any;

    constructor(
        public dataService: DataService,
    ) { }

    ngOnInit(): void {
        this.start();
    }

    ngDoCheck(): void {
        this.start();
    }

    start(): void {
        if (localStorage.getItem('tags')) {
            this.texts = JSON.parse(localStorage.getItem('tags') || '');
        }
    }

    selectElement(id: any): void {
        const a: any = [];
        const connectionsArray: any = this.dataService.readFromStorage('connections');

        for (let key = 0; key < connectionsArray.length; key++) {
            if (connectionsArray[key].tagId === id) {
                a.push(connectionsArray[key])
            }
        }

        this.dataService.select(a);
    }
}
