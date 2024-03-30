import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user-data.service'; // Import the User interface

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) {
      return users;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(user =>
      user.id.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
