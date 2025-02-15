import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { StorageService } from '../../services/storage.service';

const mockStorageService = {
  getSearchHistory: () => [
    {
      query: 'testuser',
      timestamp: new Date(),
      success: true,
      result: {
        login: 'testuser',
        avatar_url: 'https://test.com/avatar.png'
      }
    }
  ],
  clearHistory: () => {}
};

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load search history', () => {
    expect(component.searchHistory.length).toBeGreaterThan(0);
    expect(component.searchHistory[0].query).toBe('testuser');
  });
});