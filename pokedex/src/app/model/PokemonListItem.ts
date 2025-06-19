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
export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
}
