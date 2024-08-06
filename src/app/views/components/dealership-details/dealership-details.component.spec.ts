import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipDetailsComponent } from './dealership-details.component';

describe('DealershipDetailsComponent', () => {
  let component: DealershipDetailsComponent;
  let fixture: ComponentFixture<DealershipDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealershipDetailsComponent]
    });
    fixture = TestBed.createComponent(DealershipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
