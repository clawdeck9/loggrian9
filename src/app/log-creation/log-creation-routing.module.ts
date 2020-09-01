import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { LogCreationFormComponent } from './log-creation-form/log-creation-form.component';

const routes: Routes = [ { path: 'list', component: LogCreationFormComponent, 
                          children: [{ path: ':id', component: CreationFormComponent}]},
                          { path: 'form/:id', component: CreationFormComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogCreationRoutingModule { }
