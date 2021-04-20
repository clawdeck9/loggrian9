import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogSearchHomeComponent } from './log-search-home/log-search-home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { LogsByTagsResolverService } from './logs-by-tags-resolver.service';
import { TagListComponent } from './tag-list/tag-list.component';
import { LogsPlaceholderComponent } from './search-list/logs-placeholder/logs-placeholder.component';
import { CreationFormComponent } from '../log-creation/creation-form/creation-form.component';
// import { ReaderComponent } from './reader/reader.component';
// import { LogsByTitleResolverService } from './logs-by-title-resolver.service';
// import { CreationFormComponent } from '../log-creation/creation-form/creation-form.component';

const routes: Routes = [
  {
    path: '', 
    component: LogSearchHomeComponent,
    children: [ 
      {
        path: 'bytag/:tag',
        // path: 'bytag/:tag/:page', 
        component: SearchListComponent, 
        resolve: { logsByTagPage: LogsByTagsResolverService},
        children: [
          {
            path: '',
            component: LogsPlaceholderComponent
          },
          {
            path: 'creation', 
            component: LogSearchHomeComponent,
            loadChildren: () => import('../log-creation/log-creation.module').then(m => m.LogCreationModule)
          }
        ]
      },  
      {
        path: 'taglist', 
        component: TagListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSearchRoutingModule { }
