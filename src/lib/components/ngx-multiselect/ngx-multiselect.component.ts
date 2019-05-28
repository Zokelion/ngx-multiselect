import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ElementRef,
    ViewChildren,
    QueryList,
    NgZone
} from '@angular/core';
import { ItemClickedEvent } from '../../models/item-clicked-event.model';
import { Item } from '../../models/item.model';
import { faCaretRight, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
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
    providers: []
})
export class NgxMultiselectComponent implements OnInit {
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
    public timeout = null;
    public unselectAll = false;
    // icons
    public faCaretRight = faCaretRight;
    public faCheck = faCheck;
    public faTimes = faTimes;

    constructor(private _eref: ElementRef, private _zone: NgZone) {}

    ngOnInit() {
        this.items.forEach(item => {
            this.selectedItems.push(...this._getSelectedItems(item));
        });
    }

    public onChildItemClicked(event: ItemClickedEvent): void {
        this._zone.runOutsideAngular(() => {
            if (!this.unselectAll) {
                const index = this.selectedItems.findIndex(el => el.name === event.item.name);
                if (event.isSelection && index === -1) {
                    this.selectedItems.push(event.item);
                } else if (!event.isSelection && index !== -1) {
                    this.selectedItems.splice(index, 1);
                }
                event.selectedItems = this.selectedItems;
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this._zone.run(() => {
                    this.emitEvent(event);
                });
            }, 250);
        });
    }

    public emitEvent(event: ItemClickedEvent) {
        if (this.unselectAll) {
            this.unselectAll = false;
        } else {
            this.setLabel();
            this.itemSelected.emit(event);
        }
    }

    public selectAllItems(): void {
        this.children.forEach((child: NgxMultiselectChildrenComponent) => {
            child.select();
        });
    }

    public unselectAllItems(): void {
        this.unselectAll = true;
        this.itemSelected.emit({ item: null, isSelection: false, selectedItems: [] });
        this.selectedItems = [];
        this.setLabel();
        this.children.forEach((child: NgxMultiselectChildrenComponent) => {
            child.unselect();
        });
    }

    public setLabel(): void {
        if (!this.selectedItems || !this.selectedItems.length) {
            this.toggleButtonLabel = this.defaultToggleButtonLabel;
        } else {
            this.toggleButtonLabel = this.selectedItems[0].name;
        }
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

    private _getSelectedItems(item: Item): Item[] {
        if (item.children.length) {
            const result = [];
            item.children.forEach(child => {
                result.push(...this._getSelectedItems(child));
            });
            return result;
        } else if (item.isSelected) {
            return [item];
        }
        return [];
    }
}
