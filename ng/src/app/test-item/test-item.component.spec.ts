import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestItemComponent } from './test-item.component';

describe('TestItemComponent', () => {
  let component: TestItemComponent;
  let fixture: ComponentFixture<TestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
