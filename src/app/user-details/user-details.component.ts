import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, User } from '../user-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // Properties to hold user details and loading state
  userId: number;
  userData: User;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private userDataService: UserDataService) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the user ID from the URL
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData(); // Load user data when component initializes
    });
  }

  // Function to load user data
  loadUserData(): void {
    // Set loading flag to true before making the request
    this.isLoading = true;

    // Call the user data service to fetch user details
    this.userDataService.fetchUserDetails(this.userId).subscribe(
      (data: User) => {
        // Assign fetched user data to the component property
        this.userData = data;

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
