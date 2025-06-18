import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})

export class PokemonListComponent {
  public pokemonService = inject(PokemonService);
  pokemons$ = this.pokemonService.getPokemons()
}
