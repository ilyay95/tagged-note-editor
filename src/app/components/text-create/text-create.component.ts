import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-text-create',
    templateUrl: './text-create.component.html',
    styleUrls: ['./text-create.component.scss']
})
export class TextCreateComponent {

    text: string = '';
    textId: number = 0;
    tagsIdGlobal = [{ id: 1 }];
    tags: any = [];

    constructor(
        public dataService: DataService,
    ) { }

    add(): void {
        this.text = this.text.trim();
        if (this.text.length > 0) {
            this.addText();

            if (this.text.includes('#')) {
                const textArr = this.text.split(' ');

                for (let key of textArr) {
                    if (key[0] === '#') {
                        this.tags.push(key);
                    }
                }

                this.addTag();
                this.addConnections();
            }
        }
        this.text = '';
    }

    addText(): void {
        let textArr: any;
        const textId: any = this.give('texts');

        if (localStorage.getItem('texts')) {
            textArr = this.dataService.readFromStorage('texts');
            textArr.push({ id: textId.id + 1, name: this.text });
            this.textId = textId.id + 1;
            this.dataService.writeToStorage('texts', textArr);////TODO вынести за скобки
        } else {
            this.dataService.writeToStorage('texts', [{ id: textId + 1, name: this.text }]);////TODO вынести за скобки
            this.textId = 1;
        }
    }

    give(value: string): void {
        const textArr: any = this.dataService.readFromStorage(value);
        let max: any;

        if (textArr === undefined || textArr.length === 0) {
            max = 0;
        } else {
            max = textArr.reduce((acc: any, curr: any) => acc.b > curr.b ? acc : curr);
        }

        return max;
    }

    addTag(): void {
        let tagsId = 0;
        let tagsArr: any = [];

        this.tags = this.tags.filter((e: any, i: any) => this.tags.indexOf(e) === i);

        if (localStorage.getItem('tags')) {
            tagsArr = this.dataService.readFromStorage('tags');
            let tagsId: any = this.give('tags');

            if (tagsArr.length == 0) {
                tagsId = 0;

                for (let key of this.tags) {
                    tagsArr.push({ id: ++tagsId, tag: key });
                    this.tagsIdGlobal.push({ id: tagsId });
                };

            } else {
                for (let key1 of tagsArr) {
                    for (let key2 = 0; key2 < this.tags.length; key2++) {
                        if (key1.tag === this.tags[key2]) {
                            this.tagsIdGlobal.push({ id: key1.id });
                            this.tags.splice(key2, 1);
                        }
                    }
                }

                for (let key of this.tags) {
                    tagsArr.push({ id: ++tagsId.id, tag: key });
                    this.tagsIdGlobal.push({ id: tagsId.id });
                };

            }
            this.dataService.writeToStorage('tags', tagsArr);
        } else {
            for (let key of this.tags) {
                tagsArr.push({ id: ++tagsId, tag: key });
                this.tagsIdGlobal.push({ id: tagsId });
            };

            this.dataService.writeToStorage('tags', tagsArr);
        }
        this.tags.length = 0;
    }

    addConnections(): void {
        let connectionsArray: any;

        if (localStorage.getItem('connections')) {
            connectionsArray = this.dataService.readFromStorage('connections');

            for (let key of this.tagsIdGlobal) {
                connectionsArray.push({ tagId: key.id, textId: this.textId });
            }
        } else {
            this.tagsIdGlobal.splice(0, 1);
            if (connectionsArray) {
                for (let key of this.tagsIdGlobal) {
                    connectionsArray.push({ tagId: key.id, textId: this.textId });
                }
            } else {
                connectionsArray = [];
                for (let key of this.tagsIdGlobal) {
                    connectionsArray.push({ tagId: key.id, textId: this.textId });
                }
            }
        }

        this.dataService.writeToStorage('connections', connectionsArray);
        this.tagsIdGlobal.length = 0;
    }
}
