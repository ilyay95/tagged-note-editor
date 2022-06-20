import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tag-item',
    templateUrl: './tag-item.component.html',
    styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {

    constructor() { }
    @Input()
    text: string = ' ';
    ngOnInit(): void {
    }

}
