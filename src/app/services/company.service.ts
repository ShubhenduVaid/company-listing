import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Cacheable } from "ts-cacheable";

import { CompanySearchResponse } from "../models/company.model";
import { OfficersSearchResponse } from "../models/officer.model";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  private apiUrl = "/api";
  private apiKey = "PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf";

  constructor(private http: HttpClient) {}

  @Cacheable({ maxAge: 100000 })
  searchCompanies(query: string): Observable<CompanySearchResponse> {
    const url = `${this.apiUrl}/Search?Query=${query}`;
    const headers = new HttpHeaders().set("x-api-key", this.apiKey);

    return this.http
      .get<CompanySearchResponse>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  @Cacheable({ maxAge: 100000 })
  getCompanyOfficers(
    companyNumber: string
  ): Observable<OfficersSearchResponse> {
    const url = `${this.apiUrl}/Officers?CompanyNumber=${companyNumber}`;
    const headers = new HttpHeaders().set("x-api-key", this.apiKey);

    return this.http
      .get<OfficersSearchResponse>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(() => new Error("Server Issue; please try again later."));
  }
}
