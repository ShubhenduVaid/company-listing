import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CompanyDetailComponent } from "./company-detail.component";
import { CompanyService } from "../../services/company.service";

describe("CompanyDetailComponent", () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  let companyService: jasmine.SpyObj<CompanyService>;

  beforeEach(() => {
    const companyServiceSpy = jasmine.createSpyObj("CompanyService", [
      "searchCompanies",
    ]);
    const routeStub = {
      snapshot: { paramMap: new Map([["companyNumber", "12345"]]) },
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CompanyDetailComponent],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(
      CompanyService
    ) as jasmine.SpyObj<CompanyService>;

    companyService.searchCompanies.and.returnValue(
      of({
        items: [
          {
            description: "Company1",
            company_number: "12345",
            title: "Company1",
          },
        ],
        total_results: 1,
      })
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize companyDetail based on companyNumber route parameter", () => {
    fixture.detectChanges();

    expect(companyService.searchCompanies).toHaveBeenCalledWith("12345");
    expect(component.companyDetail).toEqual({
      description: "Company1",
      company_number: "12345",
      title: "Company1",
    });
    expect(component.isLoading).toBeFalse();
  });

  it("should handle errors and set isLoading to false", () => {
    companyService.searchCompanies.and.returnValue(
      throwError(() => new Error("Server error"))
    );
    fixture.detectChanges();

    expect(companyService.searchCompanies).toHaveBeenCalledWith("12345");
    expect(component.companyDetail).toEqual(null);
    expect(component.isLoading).toBeFalse();
  });
});
