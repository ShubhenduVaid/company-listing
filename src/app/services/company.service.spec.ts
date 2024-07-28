import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { catchError, throwError } from "rxjs";

import { CompanyService } from "./company.service";
describe("CompanyService", () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });

    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should call searchCompanies and return data", () => {
    const mockResponse = {
      items: [
        { description: "Company1", company_number: "12345", title: "Company1" },
        { description: "Company2", company_number: "12344", title: "Company2" },
      ],
      total_results: 1,
    };
    const query = "test";
    const url = `/api/Search?Query=${query}`;

    service.searchCompanies(query).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => {
      return (
        request.method === "GET" &&
        request.url === url &&
        request.headers.get("x-api-key") === service["apiKey"]
      );
    });
    expect(req.request.headers.get("x-api-key")).toBe(service["apiKey"]);
    req.flush(mockResponse);
  });

  it("should handle error in searchCompanies", () => {
    const query = "test";
    const url = `/api/Search?Query=${query}`;
    const errorMessage = "Server Issue; please try again later.";

    service
      .searchCompanies(query)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain(errorMessage);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => fail("Expected an error, not data"),
        error: (error) => {
          expect(error.message).toContain(errorMessage);
        },
      });

    const req = httpMock.expectOne((request) => {
      return (
        request.method === "GET" &&
        request.url === url &&
        request.headers.get("x-api-key") === service["apiKey"]
      );
    });

    req.flush(null, { status: 500, statusText: "Server Error" });
  });

  it("should call getCompanyOfficers and return data", () => {
    const companyNumber = "12345";
    const mockResponse = {
      items: [{ name: "Officer1" }, { name: "Officer2" }],
      items_per_page: 1,
    };
    const url = `/api/Officers?CompanyNumber=${companyNumber}`;

    service.getCompanyOfficers(companyNumber).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => {
      return (
        request.method === "GET" &&
        request.url === url &&
        request.headers.get("x-api-key") === service["apiKey"]
      );
    });
    expect(req.request.headers.get("x-api-key")).toBe(service["apiKey"]);
    req.flush(mockResponse);
  });
});
