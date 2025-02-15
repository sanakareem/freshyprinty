import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute } from '@angular/router';
import { GitHubService } from '../../services/github.service';
import { mockGitHubService } from '../../services/github.service.mock';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'testuser' })
          }
        },
        {
          provide: GitHubService,
          useValue: mockGitHubService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on init', (done) => {
    component.ngOnInit();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.user).toBeTruthy();
      expect(component.user?.login).toBe('testuser');
      done();
    });
  });
});