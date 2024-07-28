import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CompanyService } from "../../services/company.service";
import { SharedModule } from "../../shared.module";
import { CompanyItem, CompanySearchResponse } from "../../models/company.model";

@Component({
  selector: "app-company-detail",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./company-detail.component.html",
  styleUrl: "./company-detail.component.css",
})
export class CompanyDetailComponent implements OnInit {
  companyDetail: CompanyItem | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const companyNumber = this.route.snapshot.paramMap.get("companyNumber");
    if (companyNumber) {
      this.companyService.searchCompanies(companyNumber).subscribe({
        next: (data: CompanySearchResponse) => {
          this.companyDetail = data?.items[0] ?? null;
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
