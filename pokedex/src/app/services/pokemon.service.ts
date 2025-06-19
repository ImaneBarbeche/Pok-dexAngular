import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../model/PokemonListItem';
import { PokemonDetails } from '../model/PokemonDetails';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=50'; // URL api avec limite 50

  constructor() {}

getPokemons(): Observable<PokemonListItem[]> {
  return this.http.get<{ results: PokemonListItem[] }>(this.url).pipe(
    map(response => response.results)
    
  ); 
}

getPokemonDetails(name: string): Observable<PokemonDetails> {
  return this.http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`);
}

}
  // getPokemons(): Observable<
  //   { name: string; url: string; id: number; imageUrl: string }[]
  // > {
  //   return this.http
  //     .get<{ results: { name: string; url: string }[] }>(this.url)
  //     .pipe(
  //       map((response: { results: { name: string; url: string }[] }) => {
  //         return response.results.map((pokemon) => {
  //           const urlParts = pokemon.url.split('/');
  //           const id = Number(urlParts[urlParts.length - 2]);

  //           return {
  //             name: pokemon.name,
  //             url: pokemon.url,
  //             id: id,
  //             imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  //           };
  //         });
  //       })
  //     );
  // }

/**map(response =>
  response.results.map(pokemon => {
    const id = ...;
    const imageUrl = ...;

    return {
      name: ...,
      id: ...,
      imageUrl: ...
    };
  })
)
 */
// bout de code pour récupérer les images