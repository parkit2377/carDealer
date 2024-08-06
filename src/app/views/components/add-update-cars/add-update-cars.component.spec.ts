import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCarsComponent } from './add-update-cars.component';

describe('AddUpdateCarsComponent', () => {
  let component: AddUpdateCarsComponent;
  let fixture: ComponentFixture<AddUpdateCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateCarsComponent]
    });
    fixture = TestBed.createComponent(AddUpdateCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
