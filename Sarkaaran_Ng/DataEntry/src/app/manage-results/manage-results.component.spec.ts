import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultsComponent } from './manage-results.component';

describe('ManageResultsComponent', () => {
  let component: ManageResultsComponent;
  let fixture: ComponentFixture<ManageResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageResultsComponent]
    });
    fixture = TestBed.createComponent(ManageResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
