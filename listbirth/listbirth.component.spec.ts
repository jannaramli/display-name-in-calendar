import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbirthComponent } from './listbirth.component';

describe('ListbirthComponent', () => {
  let component: ListbirthComponent;
  let fixture: ComponentFixture<ListbirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbirthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
