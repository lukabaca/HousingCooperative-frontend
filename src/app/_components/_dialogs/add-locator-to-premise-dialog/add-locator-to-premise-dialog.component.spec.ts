import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocatorToPremiseDialogComponent } from './add-locator-to-premise-dialog.component';

describe('AddLocatorToPremiseDialogComponent', () => {
  let component: AddLocatorToPremiseDialogComponent;
  let fixture: ComponentFixture<AddLocatorToPremiseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocatorToPremiseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocatorToPremiseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
