import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from '@angular/cdk/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        CommonModule,
        RouterModule,
        CdkTableModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatBadgeModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        CdkTableModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatBadgeModule
    ],
})
export class CoreModule {}
