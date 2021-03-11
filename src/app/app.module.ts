import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecentComponent } from './components/recent/recent.component';
import { LinksComponent } from './components/links/links.component';
import { LinkComponent } from './components/link/link.component';
import { ConfigModule } from './config/config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// CDF
import { ScrollingModule } from '@angular/cdk/scrolling';

import { environment } from '../environments/environment';

// Third party
import { TimeagoModule } from 'ngx-timeago';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { RecentsPageComponent } from './components/recents-page/recents-page.component';
import { LinksPageComponent } from './components/links-page/links-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AddLinkComponent } from './components/add-link/add-link.component';
import { EditComponent } from './components/dialog/edit/edit.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatChipsModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    RecentComponent,
    LinksComponent,
    LinkComponent,
    LoginPageComponent,
    RecentsPageComponent,
    LinksPageComponent,
    DashboardPageComponent,
    AddLinkComponent,
    EditComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule.forRoot({ environment }),
    ...MaterialModules,
    TimeagoModule.forRoot(),
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [...MaterialModules],
})
export class AppModule {}
