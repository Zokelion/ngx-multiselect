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
    QueryList,
    AfterViewInit
} from '@angular/core';
import { ItemClickedEvent } from '../../models/item-clicked-event.model';
import { Item } from '../../models/item.model';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-multiselect-children',
    templateUrl: './ngx-multiselect-children.component.html',
    styleUrls: ['./ngx-multiselect-children.component.scss']
})
export class NgxMultiselectChildrenComponent implements OnInit, OnChanges, AfterViewInit {
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
    public depth: number;
    @Output()
    public itemClicked: EventEmitter<ItemClickedEvent> = new EventEmitter<ItemClickedEvent>();

    @ViewChild('element')
    public element: ElementRef<HTMLLIElement>;

    @ViewChildren(NgxMultiselectChildrenComponent)
    public children: QueryList<NgxMultiselectChildrenComponent>;

    public selectedCssClass: any;

    //icon
    public faCheck = faCheck;

    isVisible = true;
    selectedItems: Item[] = [];

    matchesFilter: boolean;
    public childrenCount: number;

    public isBranch: boolean;

    public isItem: boolean;

    constructor(private _renderer: Renderer2) {}

    ngOnInit() {
        const marginUnit = -this.depth;
        const paddingUnit = -marginUnit + 1;
        const element = this.element.nativeElement;
        this._renderer.setStyle(element, 'margin-left', marginUnit + 'rem');
        this._renderer.setStyle(element, 'padding-left', paddingUnit + 'rem');
        this.childrenCount = this.countChildren(this.item);

        this.isItem = !this.item.children.length;
        this.isBranch = !!this.item.children.length;
    }

    ngAfterViewInit() {
        if (this.isItem && this.item.isSelected) {
            this.selectedItems.push(this.item);
            this.itemClicked.emit({
                item: this.item,
                isSelection: true,
                selectedItems: this.selectedItems
            });
        }

        this._computeClasses();
    }

    ngOnChanges() {
        this.updateFilter();
    }

    public select(label?: string): void {
        if (label) {
            this._selectTarget(label);
        } else if (!this.item.isSelected) {
            this.toggle();
        }
    }

    public unselect(label?: string): void {
        if (label) {
            this._unselectTarget(label);
        } else if (this.isItem && this.item.isSelected) {
            this.toggle();
        } else if (this.isBranch) {
            this.unselectAllChildren();
        }
    }

    public onItemClicked(): void {
        this._itemToggle();
    }

    public onBranchClicked(): void {
        if (!this.item.isSelected) {
            this.selectAllChildren();
        } else {
            this.unselectAllChildren();
        }
    }

    public toggle(): void {
        if (this.isBranch) {
            this._branchToggle();
        } else {
            this._itemToggle();
        }
    }

    public onClick() {
        if (this.isBranch) {
            this.onBranchClicked();
        } else {
            this.onItemClicked();
        }
    }

    public onChildItemClicked(event: ItemClickedEvent): void {
        if (event.isSelection) {
            this._selectItem(event.item);
        } else {
            this._unselectItem(event.item);
        }

        if (this.childrenCount === this.selectedItems.length) {
            this.item.isSelected = true;
        } else {
            this.item.isSelected = false;
        }

        this._computeClasses();
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
        setTimeout(() => {
            this.selectedCssClass = {
                'd-none': !this.isVisible,
                'd-block': this.isVisible,
                'px-0': this.isFirstLevel,
                'font-italic': this.item.isSelected
            };
            this.selectedCssClass[this.item.cssSelectedClasses] = this.item.isSelected;
        }, 0);
    }

    private _itemToggle(): void {
        this.item.isSelected = !this.item.isSelected;

        if (this.item.isSelected) {
            this._selectItem(this.item);
        } else {
            this._unselectItem(this.item);
        }

        this._computeClasses();

        const event: ItemClickedEvent = {
            item: this.item,
            selectedItems: this.selectedItems,
            isSelection: this.item.isSelected
        };

        this.itemClicked.emit(event);
    }

    private _branchToggle(): void {
        this.item.isSelected = !this.item.isSelected;

        if (this.item.isSelected) {
            this.selectAllChildren();
        } else {
            this.unselectAllChildren();
        }

        this._computeClasses();
    }

    private _unselectItem(item: Item) {
        const index = this.selectedItems.findIndex(el => el.name === item.name);

        if (index !== -1) {
            this.selectedItems.splice(index, 1);
        }
    }

    private _selectItem(item: Item) {
        const index = this.selectedItems.findIndex(el => el.name === item.name);

        if (index === -1) {
            this.selectedItems.push(item);
        }
    }

    private _selectTarget(label: string) {
        if (this.isItem && this.item.name === label && !this.item.isSelected) {
            this._itemToggle();
        } else if (this.isBranch && this.item.name === label) {
            this.selectAllChildren();
        } else if (this.isBranch) {
            this.children.forEach(child => child.select(label));
        }
    }

    private _unselectTarget(label: string) {
        if (this.isItem && this.item.name === label && this.item.isSelected) {
            this._itemToggle();
        } else if (this.isBranch && this.item.name === label) {
            this.unselectAllChildren();
        } else if (this.isBranch) {
            this.children.forEach(child => child.unselect(label));
        }
    }
}
