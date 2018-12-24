import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxMultiselectComponent } from "./components/ngx-multiselect/ngx-multiselect.component";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ItemFilterPipe } from "./pipes/item-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NgxMultiselectComponent,
    ItemFilterPipe,
    ItemFilterPipe
  ],
  imports: [BrowserModule, FormsModule, BsDropdownModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
