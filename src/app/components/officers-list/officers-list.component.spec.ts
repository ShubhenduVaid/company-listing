import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersListComponent } from './officers-list.component';

describe('OfficersListComponent', () => {
  let component: OfficersListComponent;
  let fixture: ComponentFixture<OfficersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
