import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxMultiselectModule } from 'src/lib/ngx-multiselect.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxMultiselectModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
