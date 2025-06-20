// Composant qui permet de gérer l'affichage des cartes pokémons dans la page d'accueil

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: { name: string; url: string };

   /**
   * Extrait l'ID du Pokémon à partir de son URL.
   * Exemple : "https://pokeapi.co/api/v2/pokemon/25/" → "25"
   */
  getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }

  
/**
 * Formate l'identifiant numérique d'un Pokémon sur 3 chiffres.
 * Exemple : "5" devient "005", "25" devient "025"
 * Sert à afficher le numéro sous la forme officielle : N°001, N°025, etc.
 * 
 * @param id L'identifiant brut (extrait de l'URL)
 * @returns L'identifiant formaté à 3 chiffres
 */
formatId(id: string): string {
  return id.padStart(3, '0');
}


}
