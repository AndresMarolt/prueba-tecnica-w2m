import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private httpClient = inject(HttpClient);

  constructor() {}

  getAllSuperheroes() {}

  getSuperheroById() {}

  getSuperheroBySearchTerm() {}

  editSuperhero() {}

  deleteSuperhero() {}
}
