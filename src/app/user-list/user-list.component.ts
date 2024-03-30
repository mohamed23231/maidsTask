import { Component, OnInit } from '@angular/core';
import { UserDataService, User } from '../user-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // Array to hold user data
  userData: User[];

  // Current page number and total pages for pagination
  currentPage = 1;
  totalPages: number[] = [1, 2];

  // Search term for filtering users
  searchTerm: string = '';

  // Flag to indicate loading state
  isLoading: boolean = false;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // Load initial page when component initializes
    this.loadPage(this.currentPage); 
  }

  // Function to load user data for a specific page
  loadPage(pageNumber: number): void {
    // Set loading flag to true before making the request
    this.isLoading = true;

    // Call the user data service to fetch users for the specified page
    this.userDataService.fetchUsersData(pageNumber).subscribe(
      (data: { data: User[] }) => {
        // Assign fetched user data to the component property
        this.userData = data.data;

        // Set loading flag to false when the request completes successfully
        this.isLoading = false;
      },
      error => {
        // Log any errors to the console
        console.error('Error fetching user data:', error);

        // Set loading flag to false in case of error
        this.isLoading = false;
      }
    );
  }
}
