import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { OfficersListComponent } from "./officers-list.component";
import { CompanyService } from "../../services/company.service";

describe("OfficersListComponent", () => {
  let component: OfficersListComponent;
  let fixture: ComponentFixture<OfficersListComponent>;
  let companyService: jasmine.SpyObj<CompanyService>;

  beforeEach(() => {
    const companyServiceSpy = jasmine.createSpyObj("CompanyService", [
      "searchCompanies",
      "getCompanyOfficers",
    ]);
    const routeStub = {
      snapshot: { paramMap: new Map([["companyNumber", "12345"]]) },
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OfficersListComponent],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficersListComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(
      CompanyService
    ) as jasmine.SpyObj<CompanyService>;

    companyService.searchCompanies.and.returnValue(
      of({ items: [{ name: "Company1", id: "12345" }] })
    );
    companyService.getCompanyOfficers.and.returnValue(
      of({ items: [{ name: "Officer1" }, { name: "Officer2" }] })
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize companyDetail and officers based on companyNumber route parameter", () => {
    fixture.detectChanges();

    expect(companyService.searchCompanies).toHaveBeenCalledWith("12345");
    expect(companyService.getCompanyOfficers).toHaveBeenCalledWith("12345");
    expect(component.companyDetail).toEqual({ name: "Company1", id: "12345" });
    expect(component.officers).toEqual([
      { name: "Officer1" },
      { name: "Officer2" },
    ]);
    expect(component.isLoading).toBeFalse();
  });

  it("should handle error when fetching company details", () => {
    companyService.searchCompanies.and.returnValue(
      throwError(() => new Error("Error fetching company details"))
    );
    fixture.detectChanges();

    expect(companyService.searchCompanies).toHaveBeenCalledWith("12345");
    expect(component.companyDetail).toEqual({});
    expect(component.isLoading).toBeFalse();
  });

  it("should handle error when fetching officers", () => {
    companyService.getCompanyOfficers.and.returnValue(
      throwError(() => new Error("Error fetching officers"))
    );
    fixture.detectChanges();

    expect(companyService.getCompanyOfficers).toHaveBeenCalledWith("12345");
    expect(component.officers).toEqual([]);
    expect(component.isLoading).toBeFalse();
  });
});
