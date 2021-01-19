import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interfaces';
import { map } from 'rxjs/operators';  

@Injectable()
export class HeroeService {

    heroesURL:string = 'https://heroesapp-9ef48-default-rtdb.firebaseio.com/heroes.json';
    heroeURL:string = 'https://heroesapp-9ef48-default-rtdb.firebaseio.com/heroes';
    constructor( private http:HttpClient ){  }


    nuevoHeroe( heroe:Heroe ){
        let body = JSON.stringify(heroe);
        let headers = new HttpHeaders({
            'Content-Type':'application/json'
        });

        return this.http.post( this.heroesURL, body, { headers })
        .pipe (map( res=>{
            console.log(res);
        return res
        }) )
        }

    actualizarHeroe( heroe:Heroe, key$:string ){
        let body = JSON.stringify(heroe);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let url = `${ this.heroeURL }/ ${ key$ }.json`;

        return this.http.put( url, body, { headers } )
        .pipe ( map( resp =>{
            console.log(resp);
            return resp
        } ) )
    }
    
    getHeroe( key$:string ){
        let url = `${this.heroeURL}/${key$}.json`;
        return this.http.get(url)
        .pipe( map( res=>res ) );
    }
    
    getHeroes(){
        return this.http.get( this.heroesURL )
        .pipe( map( res => res ) );
    }
    
    borrarHeroe( key$ ){
        let url = ` ${ this.heroeURL }/${ key$ }.json `;
        return this.http.delete( url )  
        .pipe( map( res => res ) )
                
    }
}