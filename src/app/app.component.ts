import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Superhero } from './models/superhero.interface';
import { SuperheroService } from './services/superhero.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './customPaginatorConfiguration';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  public superheroes: Superhero[] = [];
  private superheroService = inject(SuperheroService);
  private subscriptions: Subscription[] = [];
  public pageSize = 8;
  public pageIndex = 0;

  ngOnInit(): void {
    this.subscriptions.push(
      this.superheroService.getAllSuperheroes().subscribe((heroes) => {
        this.superheroes = heroes;
      })
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  ngOnDestroy(): void {}
}
