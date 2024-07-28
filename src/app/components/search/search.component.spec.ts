import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";

import { SearchComponent } from "./search.component";
import { CompanyService } from "../../services/company.service";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let companyService: jasmine.SpyObj<CompanyService>;

  beforeEach(async () => {
    const companyServiceSpy = jasmine.createSpyObj("CompanyService", [
      "searchCompanies",
    ]);
    const activatedRouteSpy = jasmine.createSpyObj("ActivatedRoute", [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy("get").and.returnValue(null),
        },
      },
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SearchComponent],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(
      CompanyService
    ) as jasmine.SpyObj<CompanyService>;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set isValidSearchInit to true and isLoading to false when onSearch is called with valid searchQuery", async () => {
    const mockResponse = {
      items: [{ name: "Company1" }, { name: "Company2" }],
    };
    companyService.searchCompanies.and.returnValue(of(mockResponse));
    component.searchQuery = "test query";

    component.onSearch();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isValidSearchInit).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(companyService.searchCompanies).toHaveBeenCalledWith("test query");
  });

  it("should update searchResults and set isLoading to false on successful search", async () => {
    const mockResponse = {
      items: [{ name: "Company1" }, { name: "Company2" }],
    };
    companyService.searchCompanies.and.returnValue(of(mockResponse));
    component.searchQuery = "test query";

    component.onSearch();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.searchResults).toEqual(mockResponse.items);
    expect(component.isLoading).toBeFalse();
  });

  it("should handle errors and set isLoading to false on search failure", async () => {
    companyService.searchCompanies.and.returnValue(
      throwError(() => new Error("Search failed"))
    );
    component.searchQuery = "test query";

    component.onSearch();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.searchResults).toEqual([]);
    expect(component.isLoading).toBeFalse();
  });

  it("should call onSearch when onEnter is called", () => {
    spyOn(component, "onSearch");
    component.onEnter();

    expect(component.onSearch).toHaveBeenCalled();
  });

  it("should not call searchCompanies if searchQuery is empty in onSearch", () => {
    component.searchQuery = "";
    component.onSearch();

    expect(companyService.searchCompanies).not.toHaveBeenCalled();
    expect(component.isValidSearchInit).toBeFalse();
    expect(component.isLoading).toBeFalse();
  });
});
