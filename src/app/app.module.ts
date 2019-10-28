import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { UserCadastreComponent } from './ui/pages/user-cadastre/user-cadastre.component';
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { AdminCadastreComponent } from './ui/pages/web-dashboard/admin-cadastre/admin-cadastre.component';
import { GameCadastreComponent } from './ui/pages/web-dashboard/game-cadastre/game-cadastre.component';
import { WebComponent } from './ui/pages/web/web.component';
import { GameListComponent } from './ui/components/game-list/game-list.component';
import { GameDetailsComponent } from './ui/components/game-details/game-details.component';

// Pipes
import { HasImagePipe } from './pipes/has-image.pipe';

// Services
import { SettingsService } from './services/settings.service';
import { AuthenticationService } from './services/authentication.service';
import { GameService } from './services/game.service';

// Locale
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UserEditComponent } from './ui/components/user-edit/user-edit.component';
import { ProfileComponent } from './ui/pages/web/profile/profile.component';
import { FooterComponent } from './ui/components/footer/footer.component';
registerLocaleData(localept, (settingsService) => settingsService.getLocale());

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCadastreComponent,
    WebDashboardComponent,
    WebComponent,
    NavbarComponent,
    GameListComponent,
    HasImagePipe,
    AdminCadastreComponent,
    GameCadastreComponent,
    GameDetailsComponent,
    UserEditComponent,
    ProfileComponent,
    FooterComponent,
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
    AuthenticationService,
    GameService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
