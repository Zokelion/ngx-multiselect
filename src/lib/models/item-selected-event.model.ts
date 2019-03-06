import { Item } from './item.model';

export class ItemSelectedEvent {
    item: Item;
    selectedItems: Item[];
}
