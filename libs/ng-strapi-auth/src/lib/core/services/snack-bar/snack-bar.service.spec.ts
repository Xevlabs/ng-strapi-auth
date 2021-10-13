import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { HotToastModule } from '@ngneat/hot-toast';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule,
        HotToastModule.forRoot()
      ]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
