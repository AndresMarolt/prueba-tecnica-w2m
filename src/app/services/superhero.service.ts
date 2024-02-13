import { Injectable, inject } from '@angular/core';
import { Superhero } from '../models/superhero.interface';
import { Observable, Subject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  public SUPERHEROES: Superhero[] = [
    {
      _id: '6168e3cf75c1dc09b86f8d01',
      name: 'Clark Kent',
      alias: 'SUPERMAN',
      age: 35,
      height: 188,
      weight: 101,
      superpowers: [
        'Vuelo',
        'Fuerza sobrehumana',
        'Visión de calor',
        'Visión de rayos X',
      ],
      image:
        'https://i.pinimg.com/originals/84/3d/3c/843d3cc2bea7c8df224e878e8b6326dd.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d02',
      name: 'Bruce Wayne',
      alias: 'BATMAN',
      age: 42,
      height: 188,
      weight: 95,
      superpowers: [
        'Inteligencia',
        'Habilidades de combate',
        'Tecnología avanzada',
      ],
      image:
        'https://clipart.info/images/ccovers/1495749351batman-dc-comics-png-transparent.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d03',
      name: 'Diana Prince',
      alias: 'WONDER WOMAN',
      age: 3000,
      height: 183,
      weight: 74,
      superpowers: ['Fuerza sobrehumana', 'Agilidad', 'Invulnerabilidad'],
      image:
        'https://i.pinimg.com/originals/df/73/84/df73842fb7d8533e8477de38978417cc.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d04',
      name: 'Barry Allen',
      alias: 'THE FLASH',
      age: 30,
      height: 180,
      weight: 81,
      superpowers: ['Supervelocidad', 'Viaje en el tiempo'],
      image:
        'https://i.pinimg.com/originals/6d/cc/83/6dcc83f4af1ab190fdbb621792b7e166.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d05',
      name: 'Arthur Curry',
      alias: 'AQUAMAN',
      age: 39,
      height: 185,
      weight: 101,
      superpowers: [
        'Hidroquinesis',
        'Super fuerza',
        'Respiración bajo el agua',
      ],
      image:
        'https://freepngimg.com/thumb/aquaman/37704-1-aquaman-transparent-image.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d06',
      name: 'Peter Parker',
      alias: 'SPIDER-MAN',
      age: 26,
      height: 178,
      weight: 76,
      superpowers: ['Agilidad sobrehumana', 'Sentido arácnido', 'Telarañas'],
      image:
        'https://pngbuy.com/wp-content/uploads/2023/05/HD-Spiderman-PNG.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d07',
      name: 'Bruce Banner',
      alias: 'HULK',
      age: 45,
      height: 244,
      weight: 635,
      superpowers: ['Fuerza sobrehumana', 'Regeneración celular'],
      image: 'https://i.ebayimg.com/images/g/DCcAAOSwuAVcfDyd/s-l1200.webp',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d08',
      name: 'SCOTT SUMMERS',
      alias: 'CÍCLOPE',
      age: 35,
      height: 191,
      weight: 88,
      superpowers: ['Rayos ópticos', 'Visión mejorada'],
      image:
        'https://i.pinimg.com/originals/8b/8c/d7/8b8cd7b5b5081c9ee9ece63881248306.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d09',
      name: 'Tony Stark',
      alias: 'IRON MAN',
      age: 45,
      height: 185,
      weight: 102,
      superpowers: ['Inteligencia', 'Tecnología avanzada', 'Armadura'],
      image: 'https://pngimg.com/d/ironman_PNG36.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0a',
      name: 'Natalia Romanova',
      alias: 'BLACK WIDOW',
      age: 35,
      height: 170,
      weight: 59,
      superpowers: ['Maestra en combate cuerpo a cuerpo', 'Artes marciales'],
      image:
        'https://i.pinimg.com/originals/95/95/c2/9595c24319c3e1cf65082f4aaf56c47d.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0b',
      name: 'Wade Wilson',
      alias: 'DEADPOOL',
      age: 35,
      height: 188,
      weight: 95,
      superpowers: ['Regeneración celular', 'Habilidades de combate'],
      image:
        'https://cdn.inspireuplift.com/uploads/images/seller_products/30032/1702106659_1.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0c',
      name: 'Matt Murdock',
      alias: 'DAREDEVIL',
      age: 36,
      height: 183,
      weight: 91,
      superpowers: ['Sentidos mejorados', 'Habilidades de lucha'],
      image:
        'https://www.pinclipart.com/picdir/big/539-5392330_daredevil-png-clipart.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0d',
      name: 'Carol Danvers',
      alias: 'CAPTAIN MARVEL',
      age: 30,
      height: 180,
      weight: 74,
      superpowers: ['Fuerza sobrehumana', 'Vuelo', 'Proyección de energía'],
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c92b1cb3-0580-489f-8a32-ff0a3571b156/df63gx2-5e42e71f-076b-4c27-be81-5965a1ffb6e3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M5MmIxY2IzLTA1ODAtNDg5Zi04YTMyLWZmMGEzNTcxYjE1NlwvZGY2M2d4Mi01ZTQyZTcxZi0wNzZiLTRjMjctYmU4MS01OTY1YTFmZmI2ZTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R2na7Xopc8EoaM997vIt0jnNaDuAIuxI9lhE0YgXFck',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0e',
      name: 'Logan',
      alias: 'WOLVERINE',
      age: 137,
      height: 160,
      weight: 88,
      superpowers: [
        'Regeneración celular',
        'Sentidos agudizados',
        'Garras retráctiles',
      ],
      image: 'https://pngfre.com/wp-content/uploads/Wolverine-23-663x1024.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d0f',
      name: 'Johhny Storm',
      alias: 'ANTORCHA HUMANA',
      age: 29,
      height: 180,
      weight: 77,
      superpowers: ['Manipulación del fuego', 'Vuelo', 'Resistencia al calor'],
      image:
        'https://i.pinimg.com/originals/55/df/48/55df481ca58ac620f679c9794f0caf59.png',
    },
    {
      _id: '6168e3cf75c1dc09b86f8d10',
      name: 'Ororo Monroe',
      alias: 'TORMENTA',
      age: 34,
      height: 180,
      weight: 58,
      superpowers: ['Manipulación del clima', 'Vuelo', 'Control atmosférico'],
      image:
        'https://i.pinimg.com/originals/db/ac/a2/dbaca23bbf4894ae96b0f0798dcff4d6.png',
    },
  ];
  constructor() {}
  private superheroes: Subject<Superhero[]> = new Subject<Superhero[]>();
  public superheroes$: Observable<Superhero[]> =
    this.superheroes.asObservable();

  getAllSuperheroes() {
    this.superheroes.next(this.SUPERHEROES);
  }

  getSuperheroById(_id: string): Observable<Superhero | undefined> {
    return of(this.SUPERHEROES.find((superhero) => superhero._id === _id));
  }

  createSuperhero(superhero: Superhero): Observable<Superhero[]> {
    this.SUPERHEROES.push(superhero);
    return of([...this.SUPERHEROES]).pipe(
      tap((response) => {
        this.superheroes.next(response);
      })
    );
  }

  getSuperheroBySearchTerm() {}

  editSuperhero(editedSuperhero: Superhero) {
    return of(
      this.SUPERHEROES.map((superhero) => {
        return superhero._id === editedSuperhero._id
          ? editedSuperhero
          : superhero;
      })
    ).pipe(
      tap((response) => {
        this.superheroes.next(response);
      })
    );
  }

  deleteSuperhero(_id: string) {
    this.SUPERHEROES = this.SUPERHEROES.filter(
      (superhero) => superhero._id !== _id
    );
    return of([...this.SUPERHEROES]).pipe(
      tap((response) => {
        this.superheroes.next(response);
      })
    );
  }
}
