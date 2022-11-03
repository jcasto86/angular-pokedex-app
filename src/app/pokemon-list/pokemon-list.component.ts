import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  page = 1;

  totalPokemons: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  /**
   * Get Pokemons
   */
  getPokemons() {
    this.dataService
      .getPokemons(12, this.page + 0)
      .subscribe((response: any) => {
        console.log('RESPUESTA DE LA SUBSCRIPCIÓN AL OBSERVABLE: ', response.count);
        this.totalPokemons = response.count;

        response.results.forEach((result: { name: string }) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }
}
