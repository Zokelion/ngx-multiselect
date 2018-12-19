import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxMultiselectComponent } from './components/ngx-multiselect/ngx-multiselect.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxMultiselectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
