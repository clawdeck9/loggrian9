import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { LogSearchModule } from './log-search/log-search.module';
import { AppLoginComponent } from './app-login/app-login.component';
import { HeaderComponent } from './header/header.component';
// import { LogCreationModule } from './log-creation/log-creation.module';
// import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppNotfoundComponent,
    AppLoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // LogCreationModule,
    LogSearchModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
