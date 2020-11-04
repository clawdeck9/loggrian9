import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogSearchRoutingModule } from './log-search-routing.module';
import { LogSearchHomeComponent } from './log-search-home/log-search-home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ReaderComponent } from './reader/reader.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { LogCreationModule } from '../log-creation/log-creation.module';
import { ListItemComponent } from './search-list/list-item/list-item.component';
import { LogsPlaceholderComponent } from './search-list/logs-placeholder/logs-placeholder.component'

@NgModule({
  declarations: [LogSearchHomeComponent, SearchListComponent, ReaderComponent, TagListComponent, ListItemComponent, LogsPlaceholderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LogSearchRoutingModule,
    LogCreationModule
  ]
})
export class LogSearchModule { }
