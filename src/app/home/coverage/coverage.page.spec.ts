import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoveragePage } from './coverage.page';

describe('CoveragePage', () => {
  let component: CoveragePage;
  let fixture: ComponentFixture<CoveragePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
