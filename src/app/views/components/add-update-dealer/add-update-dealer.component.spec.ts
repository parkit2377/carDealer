import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDealerComponent } from './add-update-dealer.component';

describe('AddUpdateDealerComponent', () => {
  let component: AddUpdateDealerComponent;
  let fixture: ComponentFixture<AddUpdateDealerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateDealerComponent]
    });
    fixture = TestBed.createComponent(AddUpdateDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
