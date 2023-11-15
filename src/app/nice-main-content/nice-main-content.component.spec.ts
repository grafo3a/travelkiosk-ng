import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NiceMainContentComponent } from './nice-main-content.component';


describe('NiceMainContentComponent', () => {
  let component: NiceMainContentComponent;
  let fixture: ComponentFixture<NiceMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiceMainContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiceMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
