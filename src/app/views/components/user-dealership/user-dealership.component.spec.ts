import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealershipComponent } from './user-dealership.component';

describe('UserDealershipComponent', () => {
  let component: UserDealershipComponent;
  let fixture: ComponentFixture<UserDealershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDealershipComponent]
    });
    fixture = TestBed.createComponent(UserDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
