import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly apiUrl = environment.github.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${environment.github.usersEndpoint}/${query}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${environment.github.usersEndpoint}/${username}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.status === 404) {
      errorMessage = 'User not found';
    } else if (error.status === 403) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    }

    return throwError(() => errorMessage);
  }
}