import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    RouterModule,
  ],
})
export class SharedModule {}
