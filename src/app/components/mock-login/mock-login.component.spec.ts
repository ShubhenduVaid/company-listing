import { TestBed, ComponentFixture } from "@angular/core/testing";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

import { MockLoginComponent } from "./mock-login.component";
import { AuthService } from "../../services/auth.service";

describe("MockLoginComponent", () => {
  let component: MockLoginComponent;
  let fixture: ComponentFixture<MockLoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj("AuthService", [
      "isLoggedIn",
      "login",
      "logout",
    ]);

    TestBed.configureTestingModule({
      imports: [MockLoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MockLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authService.isLoggedIn.and.returnValue(false);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize isAuth based on authService.isLoggedIn()", () => {
    authService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();

    expect(component.isAuth).toBeTrue();
  });

  it("should call authService.login when toggle is checked", () => {
    const event: MatSlideToggleChange = {
      checked: true,
    } as MatSlideToggleChange;
    component.onToggle(event);

    expect(component.isAuth).toBeTrue();
    expect(authService.login).toHaveBeenCalled();
  });

  it("should call authService.logout when toggle is unchecked", () => {
    const event: MatSlideToggleChange = {
      checked: false,
    } as MatSlideToggleChange;
    component.onToggle(event);

    expect(component.isAuth).toBeFalse();
    expect(authService.logout).toHaveBeenCalled();
  });
});
