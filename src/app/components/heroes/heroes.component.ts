import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true

  constructor( private heroesService: HeroeService ) {

    this.heroesService.getHeroes()
    .subscribe( (data:any) =>{
      this.heroes = data;
      this.loading = false;
    })

  }

  ngOnInit(): void {
  
  }

  borrarHeroe( key$:string ){
    this.heroesService.borrarHeroe( key$ )
    .subscribe(res => {
      if (res) {
        console.error(res)
      } else {
        delete this.heroes[key$]
      }
    })
  }

}
