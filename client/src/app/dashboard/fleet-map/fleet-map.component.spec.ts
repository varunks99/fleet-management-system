import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetMapComponent } from './fleet-map.component';

describe('FleetMapComponent', () => {
  let component: FleetMapComponent;
  let fixture: ComponentFixture<FleetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
