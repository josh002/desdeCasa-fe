import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMarketPage } from './edit-market.page';

describe('EditMarketPage', () => {
  let component: EditMarketPage;
  let fixture: ComponentFixture<EditMarketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMarketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
