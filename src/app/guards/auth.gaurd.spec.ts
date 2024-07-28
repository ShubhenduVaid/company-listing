import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { AuthGuard } from "./auth.gaurd";
import { AuthService } from "../services/auth.service";

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: jasmine.createSpy("isLoggedIn").and.returnValue(false),
          },
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should redirect to / when not logged in", () => {
    spyOn(router, "navigate");
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should allow navigation when logged in", () => {
    spyOn(router, "navigate");
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
