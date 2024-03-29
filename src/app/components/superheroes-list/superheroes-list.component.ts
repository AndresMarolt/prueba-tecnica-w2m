import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Superhero } from '../../models/superhero.interface';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Subscription } from 'rxjs';
import { SuperheroService } from '../../services/superhero.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { getSpanishPaginatorIntl } from '../../customPaginatorConfiguration';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-superheroes-list',
  standalone: true,
  imports: [
    RouterModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './superheroes-list.component.html',
  styleUrl: './superheroes-list.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: MatDialogRef, useValue: { FormModalComponent } },
  ],
})
export class SuperheroesListComponent {
  public superheroes: Superhero[] = [];
  public pageSize = 8;
  public pageIndex = 0;
  public searchForm!: FormGroup;
  public loading: boolean = false;
  private superheroService = inject(SuperheroService);
  private dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.superheroService.superheroes$.subscribe((heroes) => {
      this.superheroes = heroes;
    });

    this.superheroService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });

    this.superheroService.getAllSuperheroes();

    this.searchForm = this.formBuilder.group({
      term: [null],
    });

    this.searchForm.get('term')?.valueChanges.subscribe((value) => {
      this.superheroService
        .getSuperheroBySearchTerm(value)
        .subscribe((superheroes) => {
          this.superheroes = superheroes;
        });
    });
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
      this.superheroService.deleteSuperhero(superhero._id!).subscribe();
    });
  }

  searchTerm(event: Event) {}
}
