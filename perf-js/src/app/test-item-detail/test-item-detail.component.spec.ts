import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestItemDetailComponent } from './test-item-detail.component';

describe('TestItemDetailComponent', () => {
  let component: TestItemDetailComponent;
  let fixture: ComponentFixture<TestItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
