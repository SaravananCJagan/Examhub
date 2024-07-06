import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePyqsComponent } from './manage-pyqs.component';

describe('ManagePyqsComponent', () => {
  let component: ManagePyqsComponent;
  let fixture: ComponentFixture<ManagePyqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePyqsComponent]
    });
    fixture = TestBed.createComponent(ManagePyqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
