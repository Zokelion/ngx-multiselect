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
  displaySelectedValue: string;
  selectAll: Boolean;
  unSelectAll: Boolean;

  constructor() {}

  ngOnInit() {
    this.selectedItems = [];
    this.items.push({
      id: 1,
      name: "World",
      isSelected: false,
      children: [
        {
          id: 2,
          name: "America",
          isSelected: false,
          children: [
            {
              id: 3,
              name: "Canada",
              isSelected: false,
              children: []
            },
            {
              id: 4,
              name: "United-States",
              isSelected: false,
              children: [
                {
                  id: 14,
                  name: "Arizona",
                  isSelected: false,
                  children: []
                },
                {
                  id: 15,
                  name: "Washington",
                  isSelected: false,
                  children: []
                }
              ]
            },
            {
              id: 5,
              name: "Mexico",
              isSelected: false,
              children: []
            }
          ]
        },
        {
          id: 6,
          name: "Europe",
          isSelected: false,
          children: [
            {
              id: 7,
              name: "France",
              isSelected: true,
              children: []
            },
            {
              id: 8,
              name: "Deutschland",
              isSelected: true,
              children: []
            }
          ]
        },
        {
          id: 9,
          name: "Asia",
          isSelected: false,
          children: [
            {
              id: 10,
              name: "China",
              isSelected: true,
              children: []
            },
            {
              id: 11,
              name: "Japan",
              isSelected: true,
              children: []
            }
          ]
        },
        {
          id: 12,
          name: "Oceania",
          isSelected: true,
          children: [
            {
              id: 13,
              name: "Australia",
              isSelected: false,
              children: []
            }
          ]
        }
      ]
    });
    this.setSelectedItems();
  }

  public selectItem(item: any): void {
    if (item.isSelected) {
      item.isSelected = false;
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    } else {
      item.isSelected = true;
      this.selectedItems.push(item);
    }
  }

  public selectAllItems(): void {
    this.selectAll = true;
    this.unSelectAll = false;

    this.items.forEach(item => {
      item.isSelected = true;
      this.selectedItems.push(item);
    });
  }

  public unSelectAllItems(): void {
    this.unSelectAll = true;
    this.selectAll = false;

    this.items.forEach(item => {
      item.isSelected = false;
    });
    this.selectedItems = [];
  }

  //set selectedItems list on the firstLoad of the page
  public setSelectedItems(): void {
    this.items.forEach(item => {
      if (item.isSelected) {
        this.selectedItems.push(item);
      }
    });
  }
}
