import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ngx-multiselect",
  templateUrl: "./ngx-multiselect.component.html",
  styleUrls: ["./ngx-multiselect.component.scss"]
})
export class NgxMultiselectComponent implements OnInit {
  selectedItems: string;
  items: any[] = [];
  constructor() {}

  ngOnInit() {
    this.selectedItems = "";
    this.items.push(
      {
        id: 1,
        name: "United-States"
      },
      {
        id: 2,
        name: "France"
      },
      {
        id: 3,
        name: "Japan"
      },
      {
        id: 4,
        name: "Australia"
      },
      {
        id: 5,
        name: "Great Britain"
      }
    );
  }
}
