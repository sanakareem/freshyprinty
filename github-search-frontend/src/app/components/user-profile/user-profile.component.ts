import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GitHubService } from '../../services/github.service';
import { GitHubUser } from '../../models/github.types';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4" *ngIf="user">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center space-x-4">
          <img [src]="user.avatar_url" 
               [alt]="user.login" 
               class="w-20 h-20 rounded-full">
          <div>
            <h2 class="text-2xl font-bold">{{user.name || user.login}}</h2>
            <p class="text-gray-600">{{user.bio}}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-6">
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold">Repositories</h3>
            <p class="text-2xl">{{user.public_repos}}</p>
          </div>
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold">Followers</h3>
            <p class="text-2xl">{{user.followers}}</p>
          </div>
        </div>

        <a [href]="user.html_url" 
           target="_blank" 
           class="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          View GitHub Profile
        </a>
      </div>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  user: GitHubUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loadUserProfile(username);
      }
    });
  }

  private loadUserProfile(username: string) {
    this.githubService.getUserProfile(username).subscribe({
      next: (user: GitHubUser) => this.user = user,
      error: (error) => console.error('Error loading user profile:', error)
    });
  }
}