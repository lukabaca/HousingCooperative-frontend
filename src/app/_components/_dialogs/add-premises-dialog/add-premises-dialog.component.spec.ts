import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPremisesDialogComponent } from './add-premises-dialog.component';

describe('AddPremisesDialogComponent', () => {
  let component: AddPremisesDialogComponent;
  let fixture: ComponentFixture<AddPremisesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPremisesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPremisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
