import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet, RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        RouterOutlet, 
        RouterLink,
        RouterModule
      ],
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: new Map()
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement;
    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('should have home and history links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(2); // Home and History links
    expect(links[0].textContent.trim()).toBe('Home');
    expect(links[1].textContent.trim()).toBe('History');
  });
});