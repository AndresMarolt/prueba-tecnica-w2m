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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './customPaginatorConfiguration';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatChipsModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: MatDialogRef, useValue: { FormModalComponent } },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  public superheroes: Superhero[] = [];
  private superheroService = inject(SuperheroService);
  private dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];
  public pageSize = 8;
  public pageIndex = 0;

  ngOnInit(): void {
    this.subscriptions.push(
      this.superheroService.superheroes$.subscribe((heroes) => {
        this.superheroes = heroes;
      })
    );

    this.superheroService.getAllSuperheroes();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  handleEdit(superhero: Superhero) {
    const editSuperheroModal = this.dialog.open(FormModalComponent, {
      autoFocus: false,
    });
    editSuperheroModal.componentInstance.superhero = superhero;
    editSuperheroModal.componentInstance.mode = 'EDIT';
    editSuperheroModal.componentInstance.closeModalEvent.subscribe(() => {
      this.dialog.closeAll();
    });
  }

  handleCreate() {
    const createSuperheroModal = this.dialog.open(FormModalComponent, {
      autoFocus: false,
    });
    createSuperheroModal.componentInstance.closeModalEvent.subscribe(() => {
      this.dialog.closeAll();
    });
  }

  handleDelete(superhero: Superhero) {
    const confirmationModal = this.dialog.open(ConfirmationModalComponent, {
      autoFocus: false,
    });
    confirmationModal.componentInstance.title = 'Eliminar superhéroe';
    confirmationModal.componentInstance.text =
      '¿Está seguro de que desea eliminar a este superhéroe?';

    confirmationModal.componentInstance.closeModalEvent.subscribe(() => {
      this.dialog.closeAll();
    });

    confirmationModal.componentInstance.confirmEvent.subscribe(() => {
      this.superheroService.deleteSuperhero(superhero.id!).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }
}
