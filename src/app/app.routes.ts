import { Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { AuthGuard } from './guards/auth.gaurd';
import { OfficersListComponent } from './components/officers-list/officers-list.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  {
    path: 'company/:companyNumber',
    component: CompanyDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'company/:companyNumber/officers',
    component: OfficersListComponent,
    canActivate: [AuthGuard],
  },
];
