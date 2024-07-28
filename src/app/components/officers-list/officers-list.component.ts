import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CompanyService } from "../../services/company.service";
import { SharedModule } from "../../shared.module";

@Component({
  selector: "app-officers-list",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./officers-list.component.html",
  styleUrl: "./officers-list.component.css",
})
export class OfficersListComponent implements OnInit {
  companyDetail: any = {};
  officers: any[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const companyNumber = this.route.snapshot.paramMap.get("companyNumber");
    if (companyNumber) {
      this.companyService.searchCompanies(companyNumber).subscribe({
        next: (data) => {
          this.companyDetail = data?.items[0] ?? {};
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
      this.companyService.getCompanyOfficers(companyNumber).subscribe({
        next: (data) => {
          this.officers = data?.items ?? [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
    }
  }
}
