import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  template: `
    <div class="flex justify-center">
      <div class="w-full max-w-xl">
        <h2 class="text-center mb-4">Search GitHub User</h2>
        <app-search></app-search>
      </div>
    </div>
  `
})
export class DashboardComponent {}