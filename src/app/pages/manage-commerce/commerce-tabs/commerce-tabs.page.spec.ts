import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommerceTabsPage } from './commerce-tabs.page';

describe('CommerceTabsPage', () => {
  let component: CommerceTabsPage;
  let fixture: ComponentFixture<CommerceTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommerceTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
