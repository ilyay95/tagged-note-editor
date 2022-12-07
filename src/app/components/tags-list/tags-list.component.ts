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

    ngAfterViewChecked(): void {
        this.sss()
    }

    sss(): void {
        let dd: any = [];
        if (this.dataService.thisText !== 0) {
            let s = this.dataService.thisText;
            const connectionsArray: any = this.dataService.readFromStorage('connections');
            for (let a = 0; a < connectionsArray.length; a++) {
                if (connectionsArray[a].textId == s.id) {
                    dd.push(connectionsArray[a].tagId);
                }
            }
            let uniqueChars = [...new Set(dd)];

            for (let a = 0; a < uniqueChars.length; a++) {

                let ss = uniqueChars[a] + '-element-container';
                let d = document.getElementById(ss);
                if (d != null) { d.classList.add("mystyle"); }///TODO
            }
        }

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
