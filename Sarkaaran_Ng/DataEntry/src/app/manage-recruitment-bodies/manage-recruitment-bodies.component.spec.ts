import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecruitmentBodiesComponent } from './manage-recruitment-bodies.component';

describe('ManageRecruitmentBodiesComponent', () => {
  let component: ManageRecruitmentBodiesComponent;
  let fixture: ComponentFixture<ManageRecruitmentBodiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRecruitmentBodiesComponent]
    });
    fixture = TestBed.createComponent(ManageRecruitmentBodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
