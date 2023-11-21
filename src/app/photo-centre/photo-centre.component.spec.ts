import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCentreComponent } from './photo-centre.component';

describe('PhotoCentreComponent', () => {
  let component: PhotoCentreComponent;
  let fixture: ComponentFixture<PhotoCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
