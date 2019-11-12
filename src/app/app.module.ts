import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { LoginComponent } from './ui/pages/web/login/login.component';
import { WebComponent } from './ui/pages/web/web.component';
import { UserCadastreComponent } from './ui/pages/web/user-cadastre/user-cadastre.component';
import { UserEditComponent } from './ui/components/user-edit/user-edit.component';
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { AdminCadastreComponent } from './ui/pages/web-dashboard/admin-cadastre/admin-cadastre.component';
import { GameCadastreComponent } from './ui/pages/web-dashboard/game-cadastre/game-cadastre.component';
import { GameListComponent } from './ui/components/game-list/game-list.component';
import { GameDetailsComponent } from './ui/components/game-details/game-details.component';
import { ProfileComponent } from './ui/pages/web/profile/profile.component';
import { FooterComponent } from './ui/components/footer/footer.component';

// Pipes
import { HasImagePipe } from './pipes/has-image.pipe';

// Services
import { SettingsService } from './services/settings.service';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';
import { GameService } from './services/game.service';

// Locale
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UserListComponent } from './ui/components/user-list/user-list.component';
import { TableHoverDirective } from './directives/table-hover.directive';
import { UserDetailsComponent } from './ui/components/user-details/user-details.component';
import { ErrorCardComponent } from './ui/components/error-card/error-card.component';
import { GameEditComponent } from './ui/pages/web-dashboard/game-edit/game-edit.component';
import { CategoryCadastreComponent } from './ui/pages/web-dashboard/category-cadastre/category-cadastre.component';
import { CategoryEditComponent } from './ui/pages/web-dashboard/category-edit/category-edit.component';
import { CategoryListComponent } from './ui/pages/web-dashboard/category-list/category-list.component';
import { UserPurchaseHistoryComponent } from './ui/components/user-purchase-history/user-purchase-history.component';
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
    UserListComponent,
    TableHoverDirective,
    UserDetailsComponent,
    ErrorCardComponent,
    GameEditComponent,
    CategoryCadastreComponent,
    CategoryEditComponent,
    CategoryListComponent,
    UserPurchaseHistoryComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 2500, position: 'right' })
  ],
  providers: [
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    AuthenticationService,
    LocalStorageService,
    UserService,
    GameService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
