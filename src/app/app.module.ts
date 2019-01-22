import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxMultiselectComponent } from './components/ngx-multiselect/ngx-multiselect.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMultiselectChildrenComponent } from './components/ngx-multiselect-children/ngx-multiselect-children.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
    declarations: [AppComponent, NgxMultiselectComponent, NgxMultiselectChildrenComponent],
    imports: [
        BrowserModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        FontAwesomeModule,
        NgScrollbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
