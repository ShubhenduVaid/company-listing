import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MockLoginComponent } from "./components/mock-login/mock-login.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should render MockLoginComponent", () => {
    const mockLoginComponent = fixture.debugElement.query(
      By.directive(MockLoginComponent)
    );
    expect(mockLoginComponent).toBeTruthy();
  });

  it("should have the correct title", () => {
    expect(component.title).toBe("risk-narrative-app");
  });
});
