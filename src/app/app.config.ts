import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { routes } from "./app.routes";
import { HttpInterceptorService } from "./services/http.interceptor";
import { CompanyService } from "./services/company.service";
import { AuthGuard } from "./guards/auth.gaurd";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatListModule,
      MatProgressSpinnerModule,
      NgxPaginationModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    CompanyService,
    AuthGuard,
  ],
};
