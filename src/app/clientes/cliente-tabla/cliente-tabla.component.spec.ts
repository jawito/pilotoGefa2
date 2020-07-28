import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTablaComponent } from './cliente-tabla.component';

describe('ClienteTablaComponent', () => {
  let component: ClienteTablaComponent;
  let fixture: ComponentFixture<ClienteTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
