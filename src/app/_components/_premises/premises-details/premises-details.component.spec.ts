import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesDetailsComponent } from './premises-details.component';

describe('PremisesDetailsComponent', () => {
  let component: PremisesDetailsComponent;
  let fixture: ComponentFixture<PremisesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
