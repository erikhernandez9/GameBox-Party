import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCreateComponent } from './proposal-create.component';

describe('ProposalCreateComponent', () => {
  let component: ProposalCreateComponent;
  let fixture: ComponentFixture<ProposalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalCreateComponent]
    });
    fixture = TestBed.createComponent(ProposalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
