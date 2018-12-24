import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ngx-multiselect",
  templateUrl: "./ngx-multiselect.component.html",
  styleUrls: ["./ngx-multiselect.component.scss"]
})
export class NgxMultiselectComponent implements OnInit {
  selectedItems: any[] = [];
  items: any[] = [];
  filter: any = { id: null, name: "", isSelected: false };

  constructor() {}

  ngOnInit() {
    this.selectedItems = [];
    this.items.push(
      {
        id: 1,
        name: "United-States",
        isSelected: false
      },
      {
        id: 2,
        name: "France",
        isSelected: true
      },
      {
        id: 3,
        name: "Japan",
        isSelected: true
      },
      {
        id: 4,
        name: "Australia",
        isSelected: false
      },
      {
        id: 5,
        name: "Great Britain",
        isSelected: false
      }
    );
  }

  public selectItem(item: any): void {
    item.isSelected = true;
    this.selectedItems.push(item);
  }

  public selectAllItems(): void {
    this.items.forEach(item => {
      item.isSelected = true;
      this.selectedItems.push(item);
    });
  }

  public unSelectAllItems(): void {
    this.items.forEach(item => {
      item.isSelected = false;
    });
    this.selectedItems = [];
  }
}
