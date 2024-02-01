import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonaComponent } from './list-persona.component';

describe('ListPersonaComponent', () => {
  let component: ListPersonaComponent;
  let fixture: ComponentFixture<ListPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPersonaComponent]
    });
    fixture = TestBed.createComponent(ListPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
