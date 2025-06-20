import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, RouterModule, CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {

  // Types disponibles pour le filtre
  availableTypes = [
    'Fire', 'Water', 'Grass', 'Electric', 'Normal', 'Bug',
    'Psychic', 'Fighting', 'Poison', 'Ground', 'Rock', 'Ghost'
  ];

  // --- Filtres réactifs ---
  private selectedType$ = new BehaviorSubject<string>('');               // Type sélectionné
  private searchTerm$ = new BehaviorSubject<string>('');                // Texte de recherche
  private sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc'); // Tri A-Z / Z-A

  private pokemonService = inject(PokemonService);

  // Liste de pokémons selon le type sélectionné (appel API dynamique)
  pokemons$ = this.selectedType$.pipe(
    switchMap(type => this.pokemonService.getPokemonsByType(type))
  );

  // Liste filtrée + triée en fonction des 3 critères
  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.searchTerm$,
    this.sortDirection$
  ]).pipe(
    map(([pokemons, searchTerm, direction]) =>
      pokemons
        .filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => this.sortByName(a, b, direction))
    )
  );

  // --- Gestion des interactions utilisateurs ---
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }

  onSort(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortDirection$.next(select.value as 'asc' | 'desc');
  }

  onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType$.next(select.value);
  }

  // --- Utilitaires ---

  /**
   * Fonction de tri alphabétique selon la direction donnée
   */
  private sortByName(
    a: { name: string },
    b: { name: string },
    direction: 'asc' | 'desc'
  ): number {
    return direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  }

  public trackByName(index: number, pokemon: { name: string }): string {
    return pokemon.name;
  }
}
