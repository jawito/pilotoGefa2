import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MierdatableComponent } from './mierdatable.component';

describe('MierdatableComponent', () => {
  let component: MierdatableComponent;
  let fixture: ComponentFixture<MierdatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MierdatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MierdatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
