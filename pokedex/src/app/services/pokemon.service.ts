import { inject, Injectable } from '@angular/core'; // decorateur qui permet d'utliser la classe dans d'autre composant et service   
import { HttpClient } from '@angular/common/http'; //  permet d’activer et configurer le module HttpClient d’Angular.
import { Observable } from 'rxjs'; // module pour accerder a des flux de données asynchrone,
import { map } from 'rxjs/operators'; // Transformer la valeur retournée par l’Observable (le pipe sert a faire la laison)
import { PokemonListItem } from '../model/PokemonListItem'; // importation du composant 
import { PokemonDetails } from '../model/PokemonDetails'; 

@Injectable({
  providedIn: 'root',
})

export class PokemonService {
  private http = inject(HttpClient); // faire d’appels HTTP (API REST, JSON, etc.)
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=50'; // URL api avec limite 50

  constructor() {}

getPokemons(): Observable<PokemonListItem[]> {
  return this.http.get<{ results: PokemonListItem[] }>(this.url).pipe(
    map(response => response.results)
  ); 
} // utilise l'appel API pour retourner les 50 premier pokemons

getPokemonDetails(name: string): Observable<PokemonDetails> {
  return this.http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`);
}
} // utilise l'appel API pour retourner les details du pokemon selon les critere du json (les données brutes de l'API)













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