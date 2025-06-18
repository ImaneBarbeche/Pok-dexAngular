import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// interface Pokemon {
//   name: string;
//   id: number;
//   imageUrl?: string;
//   type: {
//     name: string,
//     url: string,
//   };
//   poids: number;
//   taille: number;
//   statistiques : [
//     {
//       base_stat: number;
//       effort: number;

//     },
//     stat: {
//       name: string;
//       url: string;
//     }
//   ]
//   capacites: any
// }
interface PokemonListItem {
  name: string;
  url: string;
  id: number;
}



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

  getPokemonDetails(name: string) {}
}

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