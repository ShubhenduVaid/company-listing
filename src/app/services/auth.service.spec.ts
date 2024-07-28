import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set isAuthenticated to true on login", () => {
    service.login();
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  it("should set isAuthenticated to false on logout", () => {
    service.logout();
    expect(localStorage.getItem("isAuthenticated")).toBe("false");
  });

  it("should return true if user is logged in", () => {
    localStorage.setItem("isAuthenticated", "true");
    expect(service.isLoggedIn()).toBe(true);
  });

  it("should return false if user is not logged in", () => {
    localStorage.setItem("isAuthenticated", "false");
    expect(service.isLoggedIn()).toBe(false);
  });

  it("should return false if isAuthenticated is not set in localStorage", () => {
    expect(service.isLoggedIn()).toBe(false);
  });
});
