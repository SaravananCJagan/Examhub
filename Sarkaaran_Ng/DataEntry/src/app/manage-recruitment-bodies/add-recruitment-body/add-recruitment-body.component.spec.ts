import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruitmentBodyComponent } from './add-recruitment-body.component';

describe('AddRecruitmentBodyComponent', () => {
  let component: AddRecruitmentBodyComponent;
  let fixture: ComponentFixture<AddRecruitmentBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecruitmentBodyComponent]
    });
    fixture = TestBed.createComponent(AddRecruitmentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
