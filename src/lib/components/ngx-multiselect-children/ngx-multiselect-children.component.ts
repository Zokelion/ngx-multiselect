import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    Renderer2,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList
} from '@angular/core';
import { ItemClickedEvent } from '../../models/item-clicked-event.model';
import { Item } from '../../models/item.model';
import { MultiSelectService } from '../../services/multi-select.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
    item: Item;
    @Input()
    useClassicCheckbox = false;
    @Input()
    public itemClass = '';
    @Input()
    public depth: number;

    public selectedCssClass: any;

    //icon
    public faCheck = faCheck;

    isVisible = true;
    selectedItems: Item[] = [];

    matchesFilter: boolean;
    public childrenCount: number;

    @Output()
    public itemClicked: EventEmitter<ItemClickedEvent> = new EventEmitter<ItemClickedEvent>();

    @ViewChild('element')
    public element: ElementRef<HTMLLIElement>;

    @ViewChildren(NgxMultiselectChildrenComponent)
    public children: QueryList<NgxMultiselectChildrenComponent>;

    constructor(private _selectAllItemsService: MultiSelectService, private _renderer: Renderer2) {}

    ngOnInit() {
        this._computeClasses();
        this._selectAllItemsService.selectAll.subscribe(() => {
            this.select();
        });
        this._selectAllItemsService.unSelectAll.subscribe(() => {
            this.unselect();
        });
        const marginUnit = -this.depth;
        const paddingUnit = -marginUnit + 1;
        const element = this.element.nativeElement;
        this._renderer.setStyle(element, 'margin-left', marginUnit + 'rem');
        this._renderer.setStyle(element, 'padding-left', paddingUnit + 'rem');
        this.childrenCount = this.countChildren(this.item);
        if (this.item.isSelected) {
            this.selectedItems.push(this.item);
        }
    }

    ngOnChanges() {
        this.updateFilter();
    }

    public select(): void {
        if (!this.item.isSelected) {
            this.toggle();
        }
    }

    public unselect(): void {
        if (this.item.isSelected) {
            this.toggle();
        }
    }

    public onItemClicked(): void {
        const index = this.selectedItems.findIndex(el => el.name === this.item.name);
        const isSelection = index === -1;
        this.toggle();
        if (this.item.children.length) {
            this.onBranchClicked();
        }
        const event: ItemClickedEvent = {
            item: this.item,
            selectedItems: [...this.selectedItems],
            isSelection: isSelection
        };
        this.itemClicked.emit(event);
    }

    public onBranchClicked(): void {
        if (this.item.isSelected) {
            this.selectAllChildren();
        } else {
            this.unselectAllChildren();
        }
    }

    public toggle(): void {
        this.item.isSelected = !this.item.isSelected;
        if (this.item.children.length) {
            this._branchToggle();
        } else {
            this._itemToggle();
        }
        this._computeClasses();
    }

    public onChildItemClicked(event: ItemClickedEvent): void {
        if (event.isSelection) {
            this.selectedItems.push(event.item);
        } else {
            const index = this.selectedItems.findIndex(el => el.name === event.item.name);
            this.selectedItems.splice(index, 1);
        }
        if (this.childrenCount === this.selectedItems.length) {
            this.select();
        } else {
            this.unselect();
        }
        const result: ItemClickedEvent = { ...event, selectedItems: this.selectedItems };
        this.itemClicked.emit(result);
    }

    public selectAllChildren(): void {
        if (this.children && this.children.length) {
            this.children.forEach(child => {
                child.select();
            });
        }
    }

    public unselectAllChildren(): void {
        if (this.children && this.children.length) {
            this.children.forEach(child => {
                child.unselect();
                child.unselectAllChildren();
            });
        }
    }

    public countChildren(item: Item): number {
        let acc = 0;
        if (item && item.children.length) {
            item.children.forEach(child => {
                acc += this.countChildren(child);
            });
        } else {
            return 1;
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
        this.isVisible = this.matchFilter(this.item);
    }

    private _computeClasses(): void {
        this.selectedCssClass = {
            'd-none': !this.isVisible,
            'd-block': this.isVisible,
            'px-0': this.isFirstLevel
        };
        this.selectedCssClass[this.item.cssSelectedClasse] = this.item.isSelected;
    }

    private _itemToggle(): void {
        const index = this.selectedItems.findIndex(el => el.name === this.item.name);
        if (!this.item.isSelected || index !== -1) {
            this.selectedItems.splice(0, 1);
        } else {
            this.selectedItems.push(this.item);
        }
    }

    private _branchToggle(): void {
        if (this.item.isSelected) {
            this.children.forEach(child => {
                child.select();
            });
        }
    }
}
