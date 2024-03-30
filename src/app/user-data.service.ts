import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Define the User interface
export interface User {
  id: number; // Unique identifier
  email: string; // Email address of the user
  first_name: string; // First name of the user
  last_name: string; // Last name of the user
  avatar: string; // URL to the user's avatar image
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Cache to store fetched user details
  private usersCache: { [userId: number]: User } = {};

  constructor(private _HttpClient: HttpClient) {}

  // Fetch list of users from the API
  fetchUsersData(page = 1): Observable<any> {
    return this._HttpClient.get(`https://reqres.in/api/users?page=${page}`);
  }

  // Fetch details of a specific user by userId
  fetchUserDetails(userId: number): Observable<User> {
    // Check if user details exist in cache
    if (this.usersCache[userId]) {
      return of(this.usersCache[userId]); // Return cached user details
    } else {
      // Fetch user details from the API
      return this._HttpClient.get<any>(`https://reqres.in/api/users/${userId}`).pipe(
        // Extract user data from 'data' property
        map(response => response.data as User),
        // Cache the fetched user details
        tap(user => {
          this.usersCache[userId] = user;
        })
      );
    }
  }
}
