import { Component, OnInit } from '@angular/core';
import { ItemSelectedEvent } from 'src/lib/models/item-selected-event.model';
import { Item } from 'src/lib/models/item.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ngx-multiselect';
    selectedItems: Item[] = [];
    paramItems: Item[] = [];

    ngOnInit() {
        this.paramItems.push({
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
                                    isSelected: true,
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 5,
                            name: 'Mexico',
                            isSelected: true,
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
                            isSelected: false,
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
                    isSelected: false,
                    children: [
                        {
                            id: 13,
                            name: 'Australia',
                            isSelected: true,
                            children: []
                        }
                    ]
                }
            ]
        });
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        console.log(eventItem);
        this.selectedItems = eventItem.selectedItems;
    }
}
