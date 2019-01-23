import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';
import { Item } from 'src/app/models/item.model';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { MultiSelectService } from '../../services/multi-select.service';

@Component({
    selector: 'app-ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss']
})
export class NgxMultiselectComponent implements OnInit {
    // icons
    public faCaretRight = faCaretRight;

    @Input()
    public items: Item[] = [];
    @Input()
    public selectAllButtonLabel = 'Select All';
    @Input()
    public unSelectAllButtonLabel = 'Unselect All';
    @Input()
    public defaultToggleButtonLabel = 'No Items Selected';
    @Input()
    public placeholder = 'Search Items';

    @Output()
    public itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    public selectedItems: Item[] = [];
    public filter: any = { id: null, name: '', isSelected: false };
    public displaySelectedValue: string;
    public toggleButtonLabel: string;
    public includeContainer: boolean;
    public state = 'closed';

    constructor(private _selectAllItemsService: MultiSelectService) {}

    ngOnInit() {
        this.selectedItems = this.selectedItems.concat(this.items);
        this.setLabel();
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        this.selectedItems = eventItem.selectedItems;
        this.setLabel();
        this.itemSelected.emit(eventItem);
    }

    public selectAllItems(): void {
        this._selectAllItemsService.onSelectAll();
    }

    public unSelectAllItems(): void {
        this._selectAllItemsService.onUnSelectAll();
    }

    public setLabel(): void {
        setTimeout(() => {
            if (!this.selectedItems || !this.selectedItems.length) {
                this.toggleButtonLabel = this.defaultToggleButtonLabel;
            } else {
                this.toggleButtonLabel =
                    this.selectedItems[0].name + ', (' + this.selectedItems.length + ')';
            }
        }, 0);
    }

    animateToggle() {
        this.state = this.state === 'closed' ? 'open' : 'closed';
    }
}
