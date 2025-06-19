import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  public pokemonService = inject(PokemonService);
  pokemons$ = this.pokemonService.getPokemons();

  /**
 * Extrait l'ID du Pokémon à partir de l'URL fournie par l'API.
 * Exemple : "https://pokeapi.co/api/v2/pokemon/25/" → "25"
 * Sert à construire l'URL de l'image du Pokémon.
 * @param url L'URL brute du Pokémon (fournie par l'API)
 * @returns L'identifiant du Pokémon sous forme de chaîne
 */
  getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }


}
