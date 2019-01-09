import { Component } from '@angular/core';
import { ItemSelectedEvent } from './models/item-selected-event.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ngx-multiselect';
    selectedItems: any[] = [];

    public childSelected(eventItem: ItemSelectedEvent): void {
        this.selectedItems = eventItem.selectedItems;
    }
}
