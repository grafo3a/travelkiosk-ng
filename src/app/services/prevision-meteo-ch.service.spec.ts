import { TestBed } from '@angular/core/testing';
import { PrevisionMeteoChService } from './prevision-meteo-ch.service';


describe('PrevisionMeteoChService', () => {
  let service: PrevisionMeteoChService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevisionMeteoChService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
