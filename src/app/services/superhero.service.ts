import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Superhero } from '../models/superhero.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private httpClient = inject(HttpClient);
  public SUPERHEROES: Superhero[] = [
    {
      id: 1,
      name: 'Clark Kent',
      alias: 'Superman',
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
      id: 2,
      name: 'Bruce Wayne',
      alias: 'Batman',
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
      id: 3,
      name: 'Diana Prince',
      alias: 'Wonder Woman',
      age: 3000,
      height: 183,
      weight: 74,
      superpowers: ['Fuerza sobrehumana', 'Agilidad', 'Invulnerabilidad'],
      image:
        'https://i.pinimg.com/originals/df/73/84/df73842fb7d8533e8477de38978417cc.png',
    },
    {
      id: 4,
      name: 'Barry Allen',
      alias: 'The Flash',
      age: 30,
      height: 180,
      weight: 81,
      superpowers: ['Supervelocidad', 'Viaje en el tiempo'],
      image:
        'https://i.pinimg.com/originals/6d/cc/83/6dcc83f4af1ab190fdbb621792b7e166.png',
    },
    {
      id: 5,
      name: 'Arthur Curry',
      alias: 'Aquaman',
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
      id: 6,
      name: 'Hal Jordan',
      alias: 'Green Lantern',
      age: 32,
      height: 185,
      weight: 90,
      superpowers: ['Anillo de poder', 'Constructos de energía'],
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ebd221d-3581-4775-8f4c-086c377bc4c3/dfu4url-86f87a76-56f4-4c4d-a4bd-115df2048556.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFlYmQyMjFkLTM1ODEtNDc3NS04ZjRjLTA4NmMzNzdiYzRjM1wvZGZ1NHVybC04NmY4N2E3Ni01NmY0LTRjNGQtYTRiZC0xMTVkZjIwNDg1NTYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qlO8VyMM0NjtWQyjUXHWJRFY9kI9pYDBFNYwZCmdkB4',
    },
    {
      id: 7,
      name: 'Peter Parker',
      alias: 'Spider-Man',
      age: 26,
      height: 178,
      weight: 76,
      superpowers: ['Agilidad sobrehumana', 'Sentido arácnido', 'Telarañas'],
      image:
        'https://pngbuy.com/wp-content/uploads/2023/05/HD-Spiderman-PNG.png',
    },
    {
      id: 8,
      name: 'Bruce Banner',
      alias: 'Hulk',
      age: 45,
      height: 244,
      weight: 635,
      superpowers: ['Fuerza sobrehumana', 'Regeneración celular'],
      image: 'https://i.ebayimg.com/images/g/DCcAAOSwuAVcfDyd/s-l1200.webp',
    },
    {
      id: 9,
      name: 'Steve Rogers',
      alias: 'Captain America',
      age: 100,
      height: 188,
      weight: 108,
      superpowers: ['Fuerza sobrehumana', 'Agilidad', 'Escudo indestructible'],
      image:
        'https://i.pinimg.com/originals/d6/e8/02/d6e80243a42662aff77d1d6604b1ae81.png',
    },
    {
      id: 10,
      name: 'Jean Grey',
      alias: 'Phoenix',
      age: 33,
      height: 170,
      weight: 52,
      superpowers: ['Telepatía', 'Telequinesis', 'Manipulación de energía'],
      image:
        'https://i.pinimg.com/originals/b9/04/24/b904248543fdc6c607faadd422bf7049.png',
    },
    {
      id: 11,
      name: 'Scott Summers',
      alias: 'Cyclops',
      age: 35,
      height: 191,
      weight: 88,
      superpowers: ['Rayos ópticos', 'Visión mejorada'],
      image:
        'https://i.pinimg.com/originals/8b/8c/d7/8b8cd7b5b5081c9ee9ece63881248306.png',
    },
    {
      id: 12,
      name: 'Tony Stark',
      alias: 'Iron Man',
      age: 45,
      height: 185,
      weight: 102,
      superpowers: ['Inteligencia', 'Tecnología avanzada', 'Armadura'],
      image: 'https://pngimg.com/d/ironman_PNG36.png',
    },
    {
      id: 13,
      name: 'Thor Odinson',
      alias: 'Thor',
      age: 1500,
      height: 198,
      weight: 225,
      superpowers: ['Control del trueno', 'Fuerza sobrehumana', 'Vuelo'],
      image: 'https://eltallerdehector.com/wp-content/uploads/2022/10/Thor.png',
    },
    {
      id: 14,
      name: 'Natalia Romanova',
      alias: 'Black Widow',
      age: 35,
      height: 170,
      weight: 59,
      superpowers: ['Maestra en combate cuerpo a cuerpo', 'Artes marciales'],
      image:
        'https://i.pinimg.com/originals/95/95/c2/9595c24319c3e1cf65082f4aaf56c47d.png',
    },
    {
      id: 15,
      name: 'Wade Wilson',
      alias: 'Deadpool',
      age: 35,
      height: 188,
      weight: 95,
      superpowers: ['Regeneración celular', 'Habilidades de combate'],
      image:
        'https://cdn.inspireuplift.com/uploads/images/seller_products/30032/1702106659_1.png',
    },
    {
      id: 16,
      name: 'Matt Murdock',
      alias: 'Daredevil',
      age: 36,
      height: 183,
      weight: 91,
      superpowers: ['Sentidos mejorados', 'Habilidades de lucha'],
      image:
        'https://www.pinclipart.com/picdir/big/539-5392330_daredevil-png-clipart.png',
    },
    {
      id: 17,
      name: 'Carol Danvers',
      alias: 'Captain Marvel',
      age: 30,
      height: 180,
      weight: 74,
      superpowers: ['Fuerza sobrehumana', 'Vuelo', 'Proyección de energía'],
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c92b1cb3-0580-489f-8a32-ff0a3571b156/df63gx2-5e42e71f-076b-4c27-be81-5965a1ffb6e3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M5MmIxY2IzLTA1ODAtNDg5Zi04YTMyLWZmMGEzNTcxYjE1NlwvZGY2M2d4Mi01ZTQyZTcxZi0wNzZiLTRjMjctYmU4MS01OTY1YTFmZmI2ZTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R2na7Xopc8EoaM997vIt0jnNaDuAIuxI9lhE0YgXFck',
    },
    {
      id: 18,
      name: 'Wolverine',
      alias: 'Logan',
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
      id: 19,
      name: 'Antorcha Humana',
      alias: 'Johnny Storm',
      age: 29,
      height: 180,
      weight: 77,
      superpowers: ['Manipulación del fuego', 'Vuelo', 'Resistencia al calor'],
      image:
        'https://i.pinimg.com/originals/55/df/48/55df481ca58ac620f679c9794f0caf59.png',
    },
    {
      id: 20,
      name: 'Tormenta',
      alias: 'Ororo Munroe',
      age: 34,
      height: 180,
      weight: 58,
      superpowers: ['Manipulación del clima', 'Vuelo', 'Control atmosférico'],
      image:
        'https://i.pinimg.com/originals/db/ac/a2/dbaca23bbf4894ae96b0f0798dcff4d6.png',
    },
  ];
  constructor() {}

  getAllSuperheroes(): Observable<Superhero[]> {
    return of(this.SUPERHEROES);
  }

  getSuperheroById(id: number): Observable<Superhero | undefined> {
    return of(this.SUPERHEROES.find((hero) => hero.id === id));
  }

  getSuperheroBySearchTerm() {}

  editSuperhero() {}

  deleteSuperhero() {}
}
