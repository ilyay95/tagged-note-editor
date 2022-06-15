import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    trueTexts: any;
    constructor() { }


    readFromStorage(key: string): void {

        if (localStorage.length === 0) {
            return
        };
        return JSON.parse(localStorage.getItem(key) || '');
    }

    writeToStorage(key: string, value: object): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    select(a: any): void {
        this.trueTexts = a;
    }

}
