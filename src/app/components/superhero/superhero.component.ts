import { Component, OnInit, inject } from '@angular/core';
import { Superhero } from '../../models/superhero.interface';
import { SuperheroService } from '../../services/superhero.service';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-superhero',
  standalone: true,
  imports: [MatChipsModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './superhero.component.html',
  styleUrl: './superhero.component.scss',
})
export class SuperheroComponent implements OnInit {
  public superhero: Superhero | undefined;
  public loading: boolean = false;
  private superheroService = inject(SuperheroService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) =>
          this.superheroService.getSuperheroById(params['id'])
        )
      )
      .subscribe((superhero) => {
        this.superhero = superhero;
      });

    this.superheroService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }
}
