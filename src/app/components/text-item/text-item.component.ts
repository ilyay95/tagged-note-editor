import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html',
    styleUrls: ['./text-item.component.scss']
})
export class TextItemComponent {

    @Input()
    text: string = ' ';
}
