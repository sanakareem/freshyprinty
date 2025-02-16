import { Injectable } from '@angular/core';
import { SearchRecord } from '../models/github.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly HISTORY_KEY = 'searchHistory';
  private readonly MAX_HISTORY_ITEMS = 10;

  getSearchHistory(): SearchRecord[] {
    const history = localStorage.getItem(this.HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  saveSearch(record: SearchRecord): void {
    const history = this.getSearchHistory();
    history.unshift(record);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(0, this.MAX_HISTORY_ITEMS)));
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }
}