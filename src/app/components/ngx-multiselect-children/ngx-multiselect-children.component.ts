import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ngx-multiselect-children",
  templateUrl: "./ngx-multiselect-children.component.html",
  styleUrls: ["./ngx-multiselect-children.component.scss"]
})
export class NgxMultiselectChildrenComponent implements OnInit {
  @Input()
  selectAll: Boolean;
  @Input()
  unSelectAll: Boolean;
  @Input()
  items: any[];
  @Input()
  filter: any;

  constructor() {}

  ngOnInit() {}
}
