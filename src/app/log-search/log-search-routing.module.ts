import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogSearchHomeComponent } from './log-search-home/log-search-home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ReaderComponent } from './reader/reader.component';
// import { CreationFormComponent } from '../log-creation/creation-form/creation-form.component';

const routes: Routes = [{path: '', component: LogSearchHomeComponent,
                            children: [{path: 'bytag/:tag', component: SearchListComponent},
                                        {path: 'reader', component: ReaderComponent}]
                        },
                        {path: 'tags', component: LogSearchHomeComponent,
                         loadChildren: () => import('../log-creation/log-creation.module').then(m => m.LogCreationModule)
                        }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSearchRoutingModule { }
