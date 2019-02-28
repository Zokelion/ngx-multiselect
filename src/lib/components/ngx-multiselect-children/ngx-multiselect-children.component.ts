import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';
import { Item } from '../../models/item.model';
import { MultiSelectService } from 'src/lib/services/multi-select.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-multiselect-children',
    templateUrl: './ngx-multiselect-children.component.html',
    styleUrls: ['./ngx-multiselect-children.component.scss']
})
export class NgxMultiselectChildrenComponent implements OnInit, OnChanges {
    @Input()
    filter: string;
    @Input()
    isFirstLevel: boolean;
    @Input()
    includeContainer: boolean;
    @Input()
    parentItem: Item;

    isVisible = true;
    selectedItems: Item[] = [];

    matchesFilter: boolean;

    @Output()
    itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    constructor(private _selectAllItemsService: MultiSelectService) {}

    ngOnInit() {
        this.setSelectedItems();
        this._selectAllItemsService.selectAll.subscribe(() => {
            this.selectItem();
        });
        this._selectAllItemsService.unSelectAll.subscribe(() => {
            this.unSelectItem();
        });
    }

    ngOnChanges() {
        this.updateFilter();
    }

    public unSelectItem(): void {
        if (this.parentItem.children.length === 0) {
            this.parentItem.isSelected = false;
            this.selectedItems.splice(this.selectedItems.indexOf(this.parentItem), 1);
            this.itemSelected.emit({
                item: this.parentItem,
                selectedItems: this.selectedItems
            });
        } else {
            // Here we have childrens and an unselected parent
            // we check if parent must be include in the list and remove all childrens of the branch
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

    public selectItem(): void {
        this.unSelectItem();
        if (this.parentItem.children.length === 0) {
            // Here we have no children and no selected item => We're handling a click on an unchecked leaf
            this.parentItem.isSelected = true;
            this.selectedItems.push(this.parentItem);
            this.itemSelected.emit({
                item: this.parentItem,
                selectedItems: this.selectedItems
            });
        } else {
            // Here we have childrens and a selected parent
            // we check if parent must be include in the list and add all childrens of the branch
            if (this.includeContainer) {
                this.parentItem.isSelected = true;
                this.selectedItems.push(this.parentItem);
                this.itemSelected.emit({
                    item: this.parentItem,
                    selectedItems: this.selectedItems
                });
            }
            this.selectAllChildren();
        }
    }

    public itemClicked(): void {
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
                // Here we have childrens and a selected parent
                // we check if parent must be include in the list and add all childrens of the branch
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
                // Here we have childrens and an unselected parent
                // we check if parent must be include in the list and remove all childrens of the branch
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

    public selectAllChildren(items?: Item[]): void {
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
                if (this.selectedItems.indexOf(item) === -1) {
                    this.selectedItems.push(item);
                    this.itemSelected.emit({ item, selectedItems: this.selectedItems });
                }
            }
        });
    }

    public unSelectAllChildren(items?: Item[]): void {
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
        setTimeout(() => {
            if (this.parentItem.isSelected) {
                this.itemClicked();
            }
        }, 0);
    }
    private _countChildren(item?: Item): number {
        let acc = 0;
        if (!item) {
            item = this.parentItem;
        }
        if (item.children.length) {
            item.children.forEach((child: Item) => {
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

    public matchFilter(item: Item): boolean {
        let result = false;
        item.children.forEach(child => {
            if (this.matchFilter(child)) {
                result = true;
            }
        });
        const regex = new RegExp('.*' + this.filter + '.*', 'gi');
        return regex.test(item.name) || result;
    }

    public updateFilter(): void {
        this.isVisible = this.matchFilter(this.parentItem);
    }
}
