import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });
  it('creates the routed application shell', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });
});
