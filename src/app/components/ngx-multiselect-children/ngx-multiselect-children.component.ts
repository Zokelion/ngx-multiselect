import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ngx-multiselect-children",
  templateUrl: "./ngx-multiselect-children.component.html",
  styleUrls: ["./ngx-multiselect-children.component.scss"]
})
export class NgxMultiselectChildrenComponent implements OnInit {
  @Input()
  selectAll: boolean;
  @Input()
  unSelectAll: boolean;
  @Input()
  items: any[];
  @Input()
  filter: any;
  @Input()
  isFirstLevel: boolean;

  constructor() {}

  ngOnInit() {}
}
