import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMultiselectComponent } from './components/ngx-multiselect/ngx-multiselect.component';
import { NgxMultiselectChildrenComponent } from './components/ngx-multiselect-children/ngx-multiselect-children.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [NgxMultiselectComponent, NgxMultiselectChildrenComponent],
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    exports: [NgxMultiselectComponent]
})
export class NgxMultiselectModule {}
