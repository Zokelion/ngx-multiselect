import { Item } from './item.model';

export interface ItemClickedEvent {
    item: Item;
    selectedItems: Item[];
    isSelection: boolean;
}
