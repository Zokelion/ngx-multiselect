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
    selectedItems2: Item[] = [];
    paramItems: Item[] = [];
    paramItems2: Item[] = [];

    ngOnInit() {
        this.paramItems.push(
            {
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
                                isSelected: false,
                                children: []
                            },
                            {
                                id: 8,
                                name: 'Deutschlanddsdqsdqsdqsdqsdqsdqsdqdqsdqdqsdqsdqds',
                                isSelected: false,
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
                                isSelected: false,
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
                                isSelected: false,
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 20,
                name: 'test',
                isSelected: false,
                children: []
            },
            {
                id: 21,
                name: 'test2',
                isSelected: false,
                children: []
            },
            {
                id: 24,
                name: 'test3',
                isSelected: false,
                children: []
            },
            {
                id: 26,
                name: 'test4',
                isSelected: false,
                children: []
            }
        );

        this.paramItems2.push(
            {
                id: 20,
                name: 'test',
                isSelected: false,
                children: []
            },
            {
                id: 21,
                name: 'test2',
                isSelected: false,
                children: []
            },
            {
                id: 24,
                name: 'test3',
                isSelected: false,
                children: []
            },
            {
                id: 26,
                name: 'test4',
                isSelected: false,
                children: []
            }
        );
    }

    public childSelected(eventItem: ItemSelectedEvent): void {
        this.selectedItems = eventItem.selectedItems;
    }

    public childSelected2(eventItem2: ItemSelectedEvent): void {
        this.selectedItems2 = eventItem2.selectedItems;
    }
}
