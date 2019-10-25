import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { WebComponent } from './ui/pages/web/web.component';

// Services
import { SettingsService } from './services/settings.service';
import { AuthenticationService } from './services/authentication.service';

// Locale
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { UserCadasterComponent } from './ui/pages/user-cadaster/user-cadaster.component';
import { GameListComponent } from './ui/pages/web/game-list/game-list.component';
import { HasImagePipe } from './pipes/has-image.pipe';
registerLocaleData(localept, (settingsService) => settingsService.getLocale());

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCadasterComponent,
    WebDashboardComponent,
    WebComponent,
    NavbarComponent,
    GameListComponent,
    HasImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
