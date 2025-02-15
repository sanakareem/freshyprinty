import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { SearchRecord } from '../../models/github.types';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex justify-center">
      <div class="w-full max-w-3xl">
        <h2 class="text-xl font-medium mb-6">Your Search History</h2>
        
        <div class="bg-white rounded-lg">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left p-4 text-gray-500">Search Term</th>
                <th class="text-left p-4 text-gray-500">Search Results</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of searchHistory" class="border-b">
                <td class="p-4">{{record.query}}</td>
                <td class="p-4">
                  <div *ngIf="record.success" class="flex items-center">
                    <div class="mr-4">
                      <img [src]="record.result?.avatar_url" 
                           [alt]="record.result?.login"
                           class="w-12 h-12 rounded">
                    </div>
                    <span>{{record.result?.login}}</span>
                  </div>
                  <div *ngIf="!record.success" class="text-red-500">
                    Search result not found
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button 
          *ngIf="searchHistory.length > 0"
          (click)="clearHistory()"
          class="mt-6 px-6 py-2 bg-emerald-500 text-white rounded"
        >
          Clear Search History
        </button>
      </div>
    </div>
  `
})
export class HistoryComponent implements OnInit {
  searchHistory: SearchRecord[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.searchHistory = this.storageService.getSearchHistory();
  }

  clearHistory() {
    this.storageService.clearHistory();
    this.searchHistory = [];
  }
}