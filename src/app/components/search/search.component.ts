import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;

  constructor(private companyService: CompanyService) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.companyService.searchCompanies(this.searchQuery).subscribe({
        next: (data) => {
          this.searchResults = data.items;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
    }
  }

  onEnter(): void {
    this.onSearch();
  }
}
