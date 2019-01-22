import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';
import { Item } from 'src/app/models/item.model';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss']
})
export class NgxMultiselectComponent implements OnInit {
    // icons
    faCaretRight = faCaretRight;

    @Input()
    items: Item[];

    @Output()
    itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    selectedItems: Item[] = [];
    filter: any = { id: null, name: '', isSelected: false };
    displaySelectedValue: string;
    buttonLabel = 'No Items Selected';
    includeContainer: boolean;
    state = 'closed';

    constructor() {}

    ngOnInit() {
        this.selectedItems = this.selectedItems.concat(this.items);
        this.setLabel();
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        this.selectedItems = eventItem.selectedItems;
        this.setLabel();
        this.itemSelected.emit(eventItem);
    }

    public setLabel(): void {
        setTimeout(() => {
            if (!this.selectedItems || !this.selectedItems.length) {
                this.buttonLabel = 'No Items Selected';
            } else {
                this.buttonLabel =
                    this.selectedItems[0].name + ', (' + this.selectedItems.length + ')';
            }
        }, 0);
    }

    animateToggle() {
        this.state = this.state === 'closed' ? 'open' : 'closed';
    }
}
