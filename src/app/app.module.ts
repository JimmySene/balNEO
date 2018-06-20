import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

import { HttpClientModule } from '@angular/common/http';

import { OrderModule } from 'ngx-order-pipe';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MAT_DATE_LOCALE } from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';


@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    MatDatepickerModule,
    MatFormFieldModule,
     BrowserAnimationsModule,
     MatNativeDateModule,
     MatInputModule,
     MatButtonModule,
     MatToolbarModule,
     MatCardModule,
     MatSelectModule,
     MatRadioModule,
     MatDividerModule,
     MatCheckboxModule,
     OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
      {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
