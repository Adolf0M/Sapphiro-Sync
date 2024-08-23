import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishedPage } from './finished.page';

describe('FinishedPage', () => {
  let component: FinishedPage;
  let fixture: ComponentFixture<FinishedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
