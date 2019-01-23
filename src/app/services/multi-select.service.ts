import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MultiSelectService {
    selectAll: EventEmitter<void> = new EventEmitter<void>();
    unSelectAll: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public onSelectAll() {
        this.selectAll.emit();
    }

    public onUnSelectAll() {
        this.unSelectAll.emit();
    }
}
