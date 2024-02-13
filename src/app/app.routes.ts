import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SuperheroComponent } from './components/superhero/superhero.component';

export const routes: Routes = [
  { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
  { path: 'superheroes', component: SuperheroesListComponent },
  { path: 'superheroes/:id', component: SuperheroComponent },
];
