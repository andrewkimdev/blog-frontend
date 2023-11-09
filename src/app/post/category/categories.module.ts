import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { CoreModule } from '../../core/core.module';

import { categoriesReducer } from './store/categories.reducer';
import { CategoriesEffects } from './store/categories.effects';
import { CategoriesComponent } from './categories/categories.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    StoreModule.forFeature('categoriesFeatureKey', categoriesReducer),
    EffectsModule.forFeature([CategoriesEffects]),
    CoreModule,
  ],
  exports: [CategoriesComponent],
})
export class CategoriesModule { }
