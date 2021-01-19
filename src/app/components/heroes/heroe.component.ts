import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interfaces';
import { HeroeService } from '../../services/heroe.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

     heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  }

  nuevo:boolean = false;
  id:string;
  constructor( private heroesSerices:HeroeService,
               private router:Router,
               private route:ActivatedRoute) { 

                this.route.params.subscribe( params => {
                this.id = params['id']
                  if (this.id !== "nuevo") {
                      this.heroesSerices.getHeroe( this.id )
                      .subscribe( (heroe:any) =>{
                        this.heroe = heroe
                        /* console.log(heroe); */                  
                      } )
                  }
                }); 
}

  ngOnInit(): void {
  
  }

  guardar(){
    console.log(this.heroe);

    if (this.id == 'nuevo') {
      // Insertando
      this.heroesSerices.nuevoHeroe( this.heroe )
      .subscribe( (data:any) =>{
        this.router.navigate(['/heroe',data.name])
        },
        error=>console.error(error));
      
      } else {
        // Actualizando
        this.heroesSerices.actualizarHeroe( this.heroe, this.id )
        .subscribe( data =>{
          console.log(data);
        },
         error=>console.error(error));
      } 
  }

  agregarNuevo( forma:NgForm ){
    this.router.navigate(['/heroe','nuevo'])

    forma.reset({
      casa: 'Marvel'
    })
  }

}
