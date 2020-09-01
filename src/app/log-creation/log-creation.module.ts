import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogCreationRoutingModule } from './log-creation-routing.module';
import { LogCreationFormComponent } from './log-creation-form/log-creation-form.component';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LogCreationFormComponent, CreationFormComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,
    LogCreationRoutingModule
  ]
})
export class LogCreationModule { }
