import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { GitHubService } from '../../services/github.service';
import { mockGitHubService } from '../../services/github.service.mock';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule],
      providers: [
        {
          provide: GitHubService,
          useValue: mockGitHubService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for users', (done) => {
    component.searchQuery = 'testuser';
    component.searchUser();

    setTimeout(() => {
      expect(component.searchResult).toBeTruthy();
      expect(component.searchResult?.login).toBe('testuser');
      done();
    });
  });

  it('should not search with empty query', () => {
    component.searchQuery = '';
    component.searchUser();
    expect(component.searchResult).toBeFalsy();
  });
});