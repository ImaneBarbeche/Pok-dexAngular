// Importation des modules et fonctions nécessaires
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../model/PokemonDetails';
import { AsyncPipe, CommonModule } from '@angular/common';

// Déclaration du composant Angular pour la page de détails d’un Pokémon
@Component({
  standalone: true,
  selector: 'app-pokemon-detail', // nom de la balise HTML utilisée pour ce composant
  templateUrl: './pokemon-detail.component.html', // chemin vers le template HTML
  imports: [AsyncPipe, CommonModule], // modules nécessaires au template
  styleUrls: ['./pokemon-detail.component.scss'], 
})
export class PokemonDetailComponent implements OnInit {
  public pokemonService = inject(PokemonService); // Injection du service Pokémon avec la nouvelle API inject()

  constructor(private route: ActivatedRoute) {} // Injection classique du service de routing pour accéder aux paramètres d’URL

  pokemonDetails$!: Observable<PokemonDetails>; // Observable qui contiendra les données du Pokémon à afficher dans le template

  ngOnInit(): void {
    // Au chargement du composant

    const name = this.route.snapshot.paramMap.get('name'); // On récupère le nom du Pokémon depuis l’URL (paramètre dynamique :name)

    // Si le nom est présent, on appelle le service pour récupérer les détails du Pokémon
    if (name) {
      this.pokemonDetails$ = this.pokemonService.getPokemonDetails(name);
    }
  }
}
