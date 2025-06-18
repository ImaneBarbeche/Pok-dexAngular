import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    { path: 'detail', component: PokemonDetailComponent},
    { path: 'list', component: PokemonListComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
