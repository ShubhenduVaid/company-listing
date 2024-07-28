import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { HttpInterceptorService } from "./http.interceptor";
import { catchError, throwError } from "rxjs";

describe("HttpInterceptorService", () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should log the request and response", () => {
    const spyConsoleLog = spyOn(console, "log");
    const spyConsoleError = spyOn(console, "error");

    const mockResponse = { data: "test data" };
    const url = "/test-url";

    httpClient.get(url).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    req.flush(mockResponse);

    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Request:",
      jasmine.any(HttpRequest)
    );
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Response:",
      jasmine.any(HttpResponse)
    );
    expect(spyConsoleError).not.toHaveBeenCalled();
  });

  it("should log errors", () => {
    const spyConsoleError = spyOn(console, "error");
    const url = "/test-url";

    httpClient
      .get(url)
      .pipe(
        catchError((error) => {
          expect(error).toBeTruthy();
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => fail("expected an error, not data"),
        error: (error) => {
          expect(spyConsoleError).toHaveBeenCalledWith(
            "Error:",
            jasmine.any(HttpErrorResponse)
          );
        },
      });

    const req = httpMock.expectOne(url);
    req.flush(null, { status: 500, statusText: "Server Error" });

    expect(spyConsoleError).toHaveBeenCalledWith(
      "Error:",
      jasmine.any(HttpErrorResponse)
    );
  });
});
