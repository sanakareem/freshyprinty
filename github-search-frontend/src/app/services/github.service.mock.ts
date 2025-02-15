import { of } from 'rxjs';

export const mockGitHubService = {
  searchUsers: () => of({
    login: 'testuser',
    avatar_url: 'https://test.com/avatar.png',
    html_url: 'https://github.com/testuser'
  }),
  getUserProfile: () => of({
    login: 'testuser',
    avatar_url: 'https://test.com/avatar.png',
    html_url: 'https://github.com/testuser',
    name: 'Test User',
    bio: 'Test Bio'
  })
};