import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyHeaderPage } from './baby-header.page';

describe('BabyHeaderPage', () => {
  let component: BabyHeaderPage;
  let fixture: ComponentFixture<BabyHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyHeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
