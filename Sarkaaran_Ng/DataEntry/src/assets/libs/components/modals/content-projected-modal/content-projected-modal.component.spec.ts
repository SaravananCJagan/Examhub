import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectedModalComponent } from './content-projected-modal.component';

describe('ContentProjectedModalComponent', () => {
  let component: ContentProjectedModalComponent;
  let fixture: ComponentFixture<ContentProjectedModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentProjectedModalComponent]
    });
    fixture = TestBed.createComponent(ContentProjectedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
