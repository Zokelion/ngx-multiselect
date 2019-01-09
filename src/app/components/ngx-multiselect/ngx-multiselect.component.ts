import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';
import { Item } from 'src/app/models/item.model';

@Component({
    selector: 'app-ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss']
})
export class NgxMultiselectComponent implements OnInit {
    selectedItems: Item[] = [];
    items: Item[] = [];
    filter: any = { id: null, name: '', isSelected: false };
    displaySelectedValue: string;
    buttonLabel = 'No Items Selected';
    includeContainer: boolean;
    @Output()
    itemSelected: EventEmitter<ItemSelectedEvent> = new EventEmitter<ItemSelectedEvent>();

    constructor() {}

    ngOnInit() {
        this.selectedItems = [];
        this.items.push({
            id: 1,
            name: 'World',
            isSelected: false,
            children: [
                {
                    id: 2,
                    name: 'America',
                    isSelected: false,
                    children: [
                        {
                            id: 3,
                            name: 'Canada',
                            isSelected: false,
                            children: []
                        },
                        {
                            id: 4,
                            name: 'United-States',
                            isSelected: false,
                            children: [
                                {
                                    id: 14,
                                    name: 'Arizona',
                                    isSelected: false,
                                    children: []
                                },
                                {
                                    id: 15,
                                    name: 'Washington',
                                    isSelected: false,
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 5,
                            name: 'Mexico',
                            isSelected: false,
                            children: []
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Europe',
                    isSelected: false,
                    children: [
                        {
                            id: 7,
                            name: 'France',
                            isSelected: true,
                            children: []
                        },
                        {
                            id: 8,
                            name: 'Deutschland',
                            isSelected: true,
                            children: []
                        }
                    ]
                },
                {
                    id: 9,
                    name: 'Asia',
                    isSelected: false,
                    children: [
                        {
                            id: 10,
                            name: 'China',
                            isSelected: true,
                            children: []
                        },
                        {
                            id: 11,
                            name: 'Japan',
                            isSelected: true,
                            children: []
                        }
                    ]
                },
                {
                    id: 12,
                    name: 'Oceania',
                    isSelected: true,
                    children: [
                        {
                            id: 13,
                            name: 'Australia',
                            isSelected: false,
                            children: []
                        }
                    ]
                }
            ]
        });
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
}
