import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    ProfileComponent,
    DynamicFormComponent,
    DynamicModalComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    DynamicModalComponent,
    DynamicFormComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class SharedModule { }
