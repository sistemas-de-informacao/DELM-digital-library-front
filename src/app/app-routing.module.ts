import { ProfileComponent } from './ui/pages/web/profile/profile.component';
import { GameListComponent } from './ui/components/game-list/game-list.component';
import { GameDetailsComponent } from './ui/components/game-details/game-details.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Default components
import { LoginComponent } from './ui/pages/login/login.component';
import { UserCadastreComponent } from './ui/pages/user-cadastre/user-cadastre.component';
import { WebComponent } from './ui/pages/web/web.component';

// Admin components
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { AdminCadastreComponent } from './ui/pages/web-dashboard/admin-cadastre/admin-cadastre.component';
import { GameCadastreComponent } from './ui/pages/web-dashboard/game-cadastre/game-cadastre.component';


const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'cadastro', component: UserCadastreComponent },
{ path: '', redirectTo: 'loja', pathMatch: 'full' },
{
  path: 'dashboard', component: WebDashboardComponent, children: [
    { path: 'cadastro-jogo', component: GameCadastreComponent },
    { path: 'cadastro-admin', component: AdminCadastreComponent }
  ]
},
{
  path: 'loja', component: WebComponent, children: [
    { path: '', redirectTo: 'biblioteca', pathMatch: 'full' },
    { path: 'biblioteca', component: GameListComponent },
    { path: 'jogo/:id', component: GameDetailsComponent }
  ]
}, { path: 'perfil/id/:id', component: ProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
