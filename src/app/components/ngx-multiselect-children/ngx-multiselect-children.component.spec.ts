import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMultiselectChildrenComponent } from './ngx-multiselect-children.component';

describe('NgxMultiselectChildrenComponent', () => {
  let component: NgxMultiselectChildrenComponent;
  let fixture: ComponentFixture<NgxMultiselectChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMultiselectChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMultiselectChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
