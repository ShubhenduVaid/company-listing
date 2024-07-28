import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = '/api';
  private apiKey = 'PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf';

  constructor(private http: HttpClient) {}

  searchCompanies(query: string): Observable<any> {
    const url = `${this.apiUrl}/Search?Query=${query}`;
    console.log('url::', url);
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(url, { headers }).pipe(catchError(this.handleError));
  }

  getCompanyOfficers(companyNumber: string): Observable<any> {
    const url = `${this.apiUrl}/Officers?CompanyNumber=${companyNumber}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get(url, { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
