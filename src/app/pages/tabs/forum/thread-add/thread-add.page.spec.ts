import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAddPage } from './thread-add.page';

describe('ThreadAddPage', () => {
  let component: ThreadAddPage;
  let fixture: ComponentFixture<ThreadAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
