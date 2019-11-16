
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Default components
import { WebComponent } from './ui/pages/web/web.component';
import { UserCadastreComponent } from './ui/pages/web/user-cadastre/user-cadastre.component';
import { LoginComponent } from './ui/pages/web/login/login.component';
import { ProfileComponent } from './ui/pages/web/profile/profile.component';
import { UserDetailsComponent } from './ui/components/user-details/user-details.component';
import { GameListComponent } from './ui/components/game-list/game-list.component';
import { GameDetailsComponent } from './ui/components/game-details/game-details.component';

// Admin components
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { AdminCadastreComponent } from './ui/pages/web-dashboard/admin-cadastre/admin-cadastre.component';
import { GameCadastreComponent } from './ui/pages/web-dashboard/game-cadastre/game-cadastre.component';
import { UserListComponent } from './ui/components/user-list/user-list.component';
import { GameEditComponent } from './ui/pages/web-dashboard/game-edit/game-edit.component';
import { CategoryCadastreComponent } from './ui/pages/web-dashboard/category-cadastre/category-cadastre.component';
import { CategoryListComponent } from './ui/pages/web-dashboard/category-list/category-list.component';
import { CategoryEditComponent } from './ui/pages/web-dashboard/category-edit/category-edit.component';

// Guards
import { LowLevelGuard } from './guards/low-level.guard';
import { UserPurchaseHistoryComponent } from './ui/components/user-purchase-history/user-purchase-history.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'cadastro', component: UserCadastreComponent },
{ path: '', redirectTo: 'loja', pathMatch: 'full' },
{
  path: 'dashboard', component: WebDashboardComponent, canActivate: [LowLevelGuard], children: [
    { path: 'cadastro-jogo', component: GameCadastreComponent },
    { path: 'cadastro-admin', component: AdminCadastreComponent },
    { path: 'cadastro-categoria', component: CategoryCadastreComponent },
    { path: 'categorias', component: CategoryListComponent },
    { path: 'editar-categoria/:id', component: CategoryEditComponent },
    { path: 'editar-jogo/:id', component: GameEditComponent }
  ]
},
{
  path: 'loja', component: WebComponent, children: [
    { path: '', redirectTo: 'biblioteca', pathMatch: 'full' },
    { path: 'biblioteca', component: GameListComponent },
    { path: 'jogo/:id', component: GameDetailsComponent }
  ]
}, {
  path: 'comunidade', component: WebComponent, children: [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: UserListComponent },
    { path: 'perfil/display-name/:id', component: UserDetailsComponent }
  ]
},
{ path: 'perfil/id/:id', component: ProfileComponent },
{ path: 'perfil/id/:user/historico-de-compras', component: UserPurchaseHistoryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
