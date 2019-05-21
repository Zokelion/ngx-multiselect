export class Item {
    id?: number | string;
    name: string;
    isSelected: boolean;
    children: Item[];
    cssClasses: string;
    cssSelectedClasse: string;
}
