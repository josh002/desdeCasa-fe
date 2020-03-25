import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCommercePage } from './edit-commerce.page';

describe('EditCommercePage', () => {
  let component: EditCommercePage;
  let fixture: ComponentFixture<EditCommercePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommercePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommercePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
