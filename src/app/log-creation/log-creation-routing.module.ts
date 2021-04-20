import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { LogResolverService } from './log-resolver.service';

const routes: Routes = [ 
                          { path: 'form/:id/:tag', component: CreationFormComponent, //TODO: :tag is useless
                          resolve: {log: LogResolverService }
                        }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogCreationRoutingModule { }
