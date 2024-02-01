import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonaComponent } from './detail-persona.component';

describe('DetailPersonaComponent', () => {
  let component: DetailPersonaComponent;
  let fixture: ComponentFixture<DetailPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPersonaComponent]
    });
    fixture = TestBed.createComponent(DetailPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
