import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommerceHeaderPage } from './commerce-header.page';

describe('CommerceHeaderPage', () => {
  let component: CommerceHeaderPage;
  let fixture: ComponentFixture<CommerceHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceHeaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommerceHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
