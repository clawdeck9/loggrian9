import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { AppLoginComponent } from './app-login/app-login.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '', component: AppLoginComponent},
  {
    path: 'search', loadChildren: () => import('./log-search/log-search.module').then(m => m.LogSearchModule)
  }, 
  // {
  //   path: 'creation', loadChildren: () => import('./log-creation/log-creation.module').then(m => m.LogCreationModule)
  // },
  {
    path: 'home', component: AppHomeComponent,
    children: [
      { path: '', component: AppNotfoundComponent }
    ]
  },
  { path: 'login', component: AppLoginComponent },
  { path: '**', component: AppNotfoundComponent } // that one is the always the last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
