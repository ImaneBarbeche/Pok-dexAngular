import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // expose toutes les directives liées à la navigation (comme routerLink, router-outlet, etc.)
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, RouterModule, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  availableTypes = [
    'fire',
    'water',
    'grass',
    'electric',
    'normal',
    'bug',
    'psychic',
    'fighting',
    'poison',
    'ground',
    'rock',
    'ghost',
  ];

  private selectedType$ = new BehaviorSubject<string>(''); // vide = tous
  
  public pokemonService = inject(PokemonService);
  pokemons$ = this.selectedType$.pipe(
    switchMap((type) => this.pokemonService.getPokemonsByType(type))
  );

  // BehaviorSubject pour contenir et diffuser le terme de recherche
  // Il commence vide ('') et évolue à chaque frappe clavier
  private searchTerm$ = new BehaviorSubject<string>('');
  private sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');

  // Méthode appelée à chaque saisie pour mettre à jour la valeur
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }

  onSort(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortDirection$.next(select.value as 'asc' | 'desc');
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedType$.next(select.value);
  }

  // Observable filtré combiné : pokémons + champ de recherche
  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.searchTerm$,
    this.sortDirection$,
  ]).pipe(
    map(([pokemons, searchTerm, direction]) =>
      pokemons
        .filter((p) =>
          p.name.toLowerCase().includes((searchTerm ?? '').toLowerCase())
        )
        .sort((a, b) =>
          direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        )
    )
  );

  /**
   * Extrait l'ID du Pokémon à partir de l'URL fournie par l'API.
   * Exemple : "https://pokeapi.co/api/v2/pokemon/25/" → "25"
   * Sert à construire l'URL de l'image du Pokémon.
   * @param url L'URL brute du Pokémon (fournie par l'API)
   * @returns L'identifiant du Pokémon sous forme de chaîne
   */
  public getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }

  public trackByName(index: number, pokemon: { name: string }) {
    return pokemon.name;
  }

}
