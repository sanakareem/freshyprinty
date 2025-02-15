import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-white">
      <nav class="border-b">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-end space-x-8 py-4">
            <a routerLink="/" 
               routerLinkActive="border-b-2 border-blue-500 text-blue-500" 
               [routerLinkActiveOptions]="{exact: true}"
               class="hover:text-blue-500">Home</a>
            <a routerLink="/history" 
               routerLinkActive="border-b-2 border-blue-500 text-blue-500"
               class="hover:text-blue-500">History</a>
          </div>
        </div>
      </nav>
      <main class="py-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}