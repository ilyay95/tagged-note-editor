import { Component, OnInit } from '@angular/core';
import { TextItemComponent } from '../text-item/text-item.component';
import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'app-texts-list',
    templateUrl: './texts-list.component.html',
    styleUrls: ['./texts-list.component.scss']
})
export class TextsListComponent extends TextItemComponent implements OnInit {

    texts: any = [];
    boolean: boolean = true;
    textId: number = 0;
    tagsIdGlobal = [{ id: 1 }];
    tags: any = [];
    globalId: any;
    addTExtId: any;

    constructor(
        public dataService: DataService
    ) { super() }

    ngOnInit(): void {
        this.start();
    }

    ngDoCheck(): void {
        if (this.dataService.trueTexts === undefined) {
            if (this.boolean === true) {
                this.start();
            }
        } else {
            this.start2();
        }
    }

    start2(): void {
        let filterTextsByTag = [];

        this.texts = this.dataService.readFromStorage('texts');

        for (let key of this.dataService.trueTexts) {
            for (let a = 0; a < this.texts.length; a++) {
                if (key.textId === this.texts[a].id) {
                    filterTextsByTag.push(this.texts[a]);
                }
            }
        }

        this.texts.length = 0;
        this.texts = filterTextsByTag;
        this.dataService.trueTexts = undefined;
    }

    start(): void {
        if (localStorage.getItem('texts')) {
            this.texts = this.dataService.readFromStorage('texts');
        }
    }

    deleteElement(id: any): void {
        this.texts = this.dataService.readFromStorage('texts');

        for (let key = 0; key < this.texts.length; key++) {
            if (this.texts[key].id === id) {
                this.texts.splice(key, 1);
            }
        }
        this.dataService.writeToStorage('texts', this.texts)

        this.deleteConnection(id)
    }

    deleteConnection(id: any): void {
        const connectionsArr: any = this.dataService.readFromStorage('connections');
        let connectoinsIdArr = [];
        let arrOfKeys = [];

        for (let key = 0; key < connectionsArr.length; key++) {
            if (connectionsArr[key].textId === id) {
                arrOfKeys.push(key);
                connectoinsIdArr.push({ tagId: connectionsArr[key].tagId, textId: id });
            }
        }

        arrOfKeys.reverse()

        for (let key of arrOfKeys) {
            connectionsArr.splice(key, 1);
        }

        let idArr: any = [];
        let tagsArrForDelete: any = [];

        for (let key = 0; key < connectionsArr.length; key++) {
            idArr.push(connectionsArr[key].tagId)
        }

        for (let key = 0; key < connectoinsIdArr.length; key++) {
            if (idArr.indexOf(connectoinsIdArr[key]) < 0) {
                tagsArrForDelete.push(connectoinsIdArr[key]);
            }
        }

        this.dataService.writeToStorage('connections', connectionsArr);
        this.deleteTags(tagsArrForDelete);
    }

    deleteTags(id: any): void {
        const TagsArr: any = this.dataService.readFromStorage('tags');
        const connectionsArr: any = this.dataService.readFromStorage('connections');
        const ArrForDelete = [];
        const idArr = [];

        for (let a = 0; a < connectionsArr.length; a++) {
            idArr.push(connectionsArr[a].tagId);
        }

        for (let key of id) {
            if (idArr.indexOf(key.tagId) < 0) {
                for (let a = 0; a < TagsArr.length; a++) {

                    if (TagsArr[a].id === key.tagId) {
                        ArrForDelete.push(a)
                    }
                }
            }
        }

        ArrForDelete.reverse();

        for (let a of ArrForDelete) {
            TagsArr.splice(a, 1);
        }

        this.dataService.writeToStorage('tags', TagsArr);
    }

    selectElement(id: any): void {
        this.globalId = id;
        const arr = [];
        arr.push(id);
        const str = JSON.stringify(arr);

        sessionStorage.setItem('1', str)
        this.texts.length = 0;
        this.texts.push(id)
        this.boolean = false
    }

    add(id: any): void {
        this.addTExtId = id;
        this.text = this.texts[0].name;
        this.text = this.text.trim();

        if (this.text.length > 0) {
            this.addText();

            if (this.text.includes('#')) {
                let textArr = this.text.split(' ');

                for (let key of textArr) {
                    if (key[0] === '#') {
                        this.tags.push(key);
                    }
                }

                this.addTag();
            }
        }

        this.boolean = true;
    }

    addText(): void {
        let textArr: any;

        if (localStorage.getItem('texts')) {
            textArr = this.dataService.readFromStorage('texts');

            for (let key = 0; key < textArr.length; key++) {
                if (textArr[key].id === this.texts[0].id) {
                    textArr[key].name = this.text;
                }
            }

            this.dataService.writeToStorage('texts', textArr);
        }
    }

    give(value: string): void {
        const textArr: any = this.dataService.readFromStorage(value);
        let max: any;

        if (textArr === undefined) {
            max = 0;
        } else {
            max = textArr.reduce((acc: any, curr: any) => acc.b > curr.b ? acc : curr);
        }

        return max;
    }

    addTag(): void {
        let tagsArr: any = [];
        let arrForCreateConnections: any = [];

        this.tags = this.tags.filter((e: any, i: any) => this.tags.indexOf(e) === i);

        if (localStorage.getItem('tags')) {
            tagsArr = this.dataService.readFromStorage('tags');

            let arr = [];

            for (let a = 0; a < tagsArr.length; a++) {
                arr.push(tagsArr[a].tag)
            }

            if (arr.indexOf(this.tags[0]) >= 0) {
                this.tags = this.tags.filter((e: any, i: any) => this.tags.indexOf(e) === i);
                let tagsId: any = this.give('tags');

                if (tagsArr.length == 0) {
                    tagsId = 0;

                    for (let key of this.tags) {
                        tagsArr.push({ id: ++tagsId, tag: key });
                        this.tagsIdGlobal.push({ id: tagsId });
                        arrForCreateConnections.push(tagsId)
                    }

                } else {
                    for (let key1 of tagsArr) {
                        for (let key2 = 0; key2 < this.tags.length; key2++) {

                            if (key1.tag === this.tags[key2]) {
                                arrForCreateConnections.push(key1)
                                this.tagsIdGlobal.push({ id: key1.id });
                                this.tags.splice(key2, 1);
                            }
                        }
                    }

                    for (let key of this.tags) {
                        tagsArr.push({ id: ++tagsId.id, tag: key });
                        arrForCreateConnections.push(tagsId)
                        this.tagsIdGlobal.push({ id: tagsId.id });
                    };
                }

                this.dataService.writeToStorage('tags', tagsArr);
            }
        } else {
            let tagsId = 0;

            for (let a = 0; a < this.tags.length; a++) {
                arrForCreateConnections.push({ id: ++tagsId, tag: this.tags[a] })
            }
            this.dataService.writeToStorage('tags', arrForCreateConnections);
        }
        this.addConnections(arrForCreateConnections, this.text);
    }

    addConnections(aa: any, b: any): void {
        let connectionsArray: any = [];;
        let arr1 = [];
        this.addTExtId;

        if (localStorage.getItem('connections')) {
            connectionsArray = this.dataService.readFromStorage('connections');
            arr1 = connectionsArray.slice();

            for (let a = 0; a < connectionsArray.length; a++) {
                for (let b of aa) {
                    if (connectionsArray[a].textId === this.texts[0].id) {
                        if (b.id != connectionsArray[a].tagId) {
                            arr1.push({ tagId: b.id, textId: this.texts[0].id });
                        }
                    }
                }
            }

            connectionsArray = arr1;
        }
        else {
            for (let key of aa) {
                connectionsArray.push({ tagId: key.id, textId: this.texts[0].id });
            }
        }

        this.dataService.writeToStorage('connections', connectionsArray);
        this.globalId.length = 0;
        this.tags.length = 0;
    }

}
