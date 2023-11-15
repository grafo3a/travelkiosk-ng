import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NiceHeaderComponent } from './nice-header.component';


describe('NiceHeaderComponent', () => {
  let component: NiceHeaderComponent;
  let fixture: ComponentFixture<NiceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiceHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
