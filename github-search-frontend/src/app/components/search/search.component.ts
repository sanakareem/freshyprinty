import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GitHubService } from '../../services/github.service';
import { StorageService } from '../../services/storage.service';
import { GitHubUser } from '../../models/types';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="space-y-4">
      <div class="flex flex-col items-center">
        <div class="w-full relative">
          <div class="relative w-full">
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (keyup.enter)="searchUser()"
              placeholder="Ethan Linker"
              class="w-full p-2 pl-8 border rounded"
            />
            <span class="absolute left-2 top-2.5">🔍</span>
          </div>
        </div>
        
        <button 
          (click)="searchUser()"
          class="w-full mt-4 p-2 bg-emerald-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <div *ngIf="searchResult" class="mt-8">
        <h3 class="text-gray-500 mb-4">Search Results</h3>
        <div class="border rounded p-4">
          <div class="flex items-start">
            <div class="mr-4">
              <p class="text-gray-500 text-sm mb-1">User Image</p>
              <img [src]="searchResult.avatar_url" 
                   [alt]="searchResult.login"
                   class="w-16 h-16 rounded">
            </div>
            <div>
              <p class="text-gray-500 text-sm mb-1">GitHub User Name</p>
              <p class="font-medium">{{searchResult.login}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  searchQuery = '';
  searchResult: GitHubUser | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private githubService: GitHubService,
    private storageService: StorageService
  ) {}

  searchUser() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.error = null;
    this.searchResult = null;

    this.githubService.searchUsers(this.searchQuery).subscribe({
      next: (user) => {
        this.searchResult = user;
        this.storageService.saveSearch({
          query: this.searchQuery,
          timestamp: new Date(),
          success: true,
          result: user
        });
      },
      error: (error) => {
        this.error = error;
        this.storageService.saveSearch({
          query: this.searchQuery,
          timestamp: new Date(),
          success: false,
          result: null
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
