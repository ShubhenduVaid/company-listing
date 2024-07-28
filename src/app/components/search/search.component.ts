import { Component } from "@angular/core";

import { CompanyService } from "../../services/company.service";
import { SharedModule } from "../../shared.module";
import { CompanyItem, CompanySearchResponse } from "../../models/company.model";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  searchQuery: string = "";
  searchResults: CompanyItem[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  isValidSearchInit: boolean = false;

  constructor(private companyService: CompanyService) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isValidSearchInit = true;
      this.isLoading = true;
      this.companyService.searchCompanies(this.searchQuery).subscribe({
        next: (data: CompanySearchResponse) => {
          this.searchResults = data?.items ?? [];
          this.isLoading = false;
        },
        error: (error: any) => {
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
