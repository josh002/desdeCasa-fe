import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageCommercePage } from './manage-commerce.page';

describe('ManageCommercePage', () => {
  let component: ManageCommercePage;
  let fixture: ComponentFixture<ManageCommercePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommercePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageCommercePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
