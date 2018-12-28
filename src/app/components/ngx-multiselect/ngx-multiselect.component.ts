import { Component, OnInit } from '@angular/core';
import { ItemSelectedEvent } from '../../models/item-selected-event.model';

@Component({
    selector: 'app-ngx-multiselect',
    templateUrl: './ngx-multiselect.component.html',
    styleUrls: ['./ngx-multiselect.component.scss']
})
export class NgxMultiselectComponent implements OnInit {
    selectedItems: any[] = [];
    items: any[] = [];
    filter: any = { id: null, name: '', isSelected: false };
    displaySelectedValue: string;
    buttonLabel: string;
    includeContainer: boolean;

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

    public selectAllItems(items: any[]): void {
        items.forEach(item => {
            item.isSelected = true;
            if (item.children.length > 0) {
                this.selectAllItems(item.children);
            }
            this.selectedItems.push(item);
        });
    }

    public unSelectAllItems(items: any[]): void {
        items.forEach(item => {
            item.isSelected = false;
            if (item.children.length > 0) {
                this.unSelectAllItems(item.children);
            }
        });
        this.selectedItems = [];
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        this.selectedItems = eventItem.selectedItems;
        console.log('selected : ', this.selectedItems);
        this.setLabel();
    }

    public setLabel(): void {
        if (this.selectedItems.length === 0) {
            this.buttonLabel = 'No Items Selected';
        } else {
            this.buttonLabel = this.selectedItems[0].name + ', (' + this.selectedItems.length + ')';
        }
    }
}
