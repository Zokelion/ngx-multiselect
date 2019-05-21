import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ElementRef,
    ViewChildren,
    QueryList
} from '@angular/core';
import { ItemClickedEvent } from '../../models/item-clicked-event.model';
import { Item } from '../../models/item.model';
import { faCaretRight, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MultiSelectService } from '../../services/multi-select.service';
import { NgxMultiselectChildrenComponent } from '../ngx-multiselect-children/ngx-multiselect-children.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(document:click)': 'onClick($event)'
    },
    providers: [MultiSelectService]
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
    public unselectAllButtonLabel = 'Unselect All';
    @Input()
    public defaultToggleButtonLabel = 'No Items Selected';
    @Input()
    public placeholder = 'Search Items';
    @Input()
    public toggleBtnClass = 'btn-primary w-75';
    @Input()
    public toggleContentClass = 'w-100';
    @Input()
    public itemClass = '';
    @Input()
    public enableAnimation = true;
    @Input()
    public useClassicCheckbox = false;
    @Input()
    public enableResearch = true;
    @Input()
    public disabled = false;

    @Output()
    public itemSelected: EventEmitter<ItemClickedEvent> = new EventEmitter<ItemClickedEvent>();

    @ViewChildren(NgxMultiselectChildrenComponent)
    children: QueryList<NgxMultiselectChildrenComponent>;

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

    public childSelected(eventItem: ItemClickedEvent): void {
        if (eventItem.item.isSelected && this.selectedItems.indexOf(eventItem.item) === -1) {
            this.selectedItems.push(eventItem.item);
            eventItem.selectedItems = this.selectedItems;
        } else if (
            !eventItem.item.isSelected &&
            this.selectedItems.indexOf(eventItem.item) !== -1
        ) {
            this.selectedItems.splice(this.selectedItems.indexOf(eventItem.item), 1);
        }
        eventItem.selectedItems = this.selectedItems;
        this.setLabel();
        this.itemSelected.emit(eventItem);
    }

    public selectAllItems(): void {
        this.children.forEach((child: NgxMultiselectChildrenComponent) => {
            child.select();
        });
    }

    public unselectAllItems(): void {
        this.children.forEach((child: NgxMultiselectChildrenComponent) => {
            child.unselect();
        });
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
