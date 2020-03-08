import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealContentComponent } from './reveal-content.component';

describe('RevealContentComponent', () => {
  let component: RevealContentComponent;
  let fixture: ComponentFixture<RevealContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
