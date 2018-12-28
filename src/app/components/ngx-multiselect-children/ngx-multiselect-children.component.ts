import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChange,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';

@Component({
    selector: 'app-ngx-multiselect-children',
    templateUrl: './ngx-multiselect-children.component.html',
    styleUrls: ['./ngx-multiselect-children.component.scss']
})
export class NgxMultiselectChildrenComponent implements OnInit, OnChanges {
    @Input()
    filter: any;
    @Input()
    isFirstLevel: boolean;
    @Input()
    includeContainer: boolean;
    @Input()
    parentItem: any;

    selectedItems: any[] = [];

    @Output()
    itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    constructor() {}

    ngOnInit() {
        this.setSelectedItems();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this._countChildren(), 'children found for', this.parentItem.name);
    }

    public selectItem(): void {
        if (this.parentItem.children.length === 0) {
            // Here we have no children and no selected item => We're handling a click on an unchecked leaf
            if (this.selectedItems.length === 0) {
                this.parentItem.isSelected = true;
                this.selectedItems.push(this.parentItem);
                this.itemSelected.emit({
                    item: this.parentItem,
                    selectedItems: this.selectedItems
                });
            } else {
                // Here we have no children and a selected item => We're handling a click on an checked leaf
                this.parentItem.isSelected = false;
                this.selectedItems.splice(this.selectedItems.indexOf(this.parentItem), 1);
                this.itemSelected.emit({
                    item: this.parentItem,
                    selectedItems: this.selectedItems
                });
            }
        } else {
            if (this.parentItem.isSelected) {
                // Here we have childrens and a selected parent, we check if parent must be include in the list and add all childrens of the branch
                if (this.includeContainer) {
                    this.parentItem.isSelected = true;
                    this.selectedItems.push(this.parentItem);
                    this.itemSelected.emit({
                        item: this.parentItem,
                        selectedItems: this.selectedItems
                    });
                }
                this.selectAllChildren();
            } else {
                // Here we have childrens and an unselected parent, we check if parent must be include in the list and remove all childrens of the branch
                if (this.includeContainer) {
                    this.parentItem.isSelected = false;
                    this.selectedItems.splice(this.selectedItems.indexOf(this.parentItem), 1);
                    this.itemSelected.emit({
                        item: this.parentItem,
                        selectedItems: this.selectedItems
                    });
                }
                this.unSelectAllChildren();
            }
        }
    }

    public selectAllChildren(items?: any[]): void {
        if (!items) {
            items = this.parentItem.children;
        }
        items.forEach(item => {
            item.isSelected = true;
            if (item.children.length > 0) {
                this.selectAllChildren(item.children);
                if (this.includeContainer) {
                    this.selectedItems.push(item);
                    this.itemSelected.emit({ item, selectedItems: this.selectedItems });
                }
            } else {
                this.selectedItems.push(item);
                this.itemSelected.emit({ item, selectedItems: this.selectedItems });
            }
        });
    }

    public unSelectAllChildren(items?: any[]): void {
        if (!items) {
            items = this.parentItem.children;
        }
        items.forEach(item => {
            item.isSelected = false;
            if (item.children.length > 0) {
                this.unSelectAllChildren(item.children);
                if (this.includeContainer) {
                    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
                    this.itemSelected.emit({ item, selectedItems: this.selectedItems });
                }
            } else {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
                this.itemSelected.emit({ item, selectedItems: this.selectedItems });
            }
        });
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        if (this.selectedItems.indexOf(eventItem.item) !== -1 && !eventItem.item.isSelected) {
            this.selectedItems.splice(this.selectedItems.indexOf(eventItem.item), 1);
        } else if (eventItem.item.isSelected && this.selectedItems.indexOf(eventItem.item) === -1) {
            this.selectedItems.push(eventItem.item);
        }

        if (this.selectedItems.length === this._countChildren()) {
            this.parentItem.isSelected = true;
            if (this.includeContainer) {
                this.selectedItems.push(this.parentItem);
            }
        } else {
            this.parentItem.isSelected = false;
            if (this.includeContainer && this.selectedItems.indexOf(this.parentItem) !== -1) {
                this.selectedItems.splice(this.selectedItems.indexOf(this.parentItem), 1);
            }
        }
        this.itemSelected.emit({ item: eventItem.item, selectedItems: this.selectedItems });
    }

    // set selectedItems list on the firstLoad of the page
    public setSelectedItems(): void {
        this.parentItem.children.forEach(item => {
            // this.childSelected({ item });
        });
    }
    private _countChildren(item?: any): number {
        let acc = 0;
        if (!item) {
            item = this.parentItem;
        }
        if (item.children.length) {
            item.children.forEach((child: any) => {
                acc += this._countChildren(child);
            });
            if (this.includeContainer) {
                acc++;
            }
        } else {
            acc++;
        }

        return acc;
    }
}
