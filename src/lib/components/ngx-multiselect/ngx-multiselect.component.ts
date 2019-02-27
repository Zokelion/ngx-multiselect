import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';
import { Item } from '../../models/item.model';
import { faCaretRight, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MultiSelectService } from '../../services/multi-select.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(document:click)': 'onClick($event)'
    }
})
export class NgxMultiselectComponent implements OnInit {
    // icons
    public faCaretRight = faCaretRight;
    public faCheck = faCheck;
    public faTimes = faTimes;

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
    @Input()
    public toggleBtnClass = 'btn-primary w-75';
    @Input()
    public toggleContentClass = 'w-100';
    @Input()
    public enableAnimation = true;

    @Output()
    public itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    public selectedItems: Item[] = [];
    public filter: any = { id: null, name: '', isSelected: false };
    public displaySelectedValue: string;
    public toggleButtonLabel: string;
    public includeContainer: boolean;
    public state = 'closed';

    constructor(private _selectAllItemsService: MultiSelectService, private _eref: ElementRef) {}

    ngOnInit() {
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
                this.toggleButtonLabel = this.selectedItems[0].name;
            }
        }, 0);
    }

    animateToggle() {
        this.state = this.state === 'closed' ? 'open' : 'closed';
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            if (this.state === 'open') {
                this.animateToggle();
            }
        }
    }
}
